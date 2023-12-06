import math
from sklearn import neighbors
import os
import pickle
from PIL import Image, ImageDraw
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder

from base64 import b64decode, b64encode, decodebytes
import cv2,io,csv
import numpy as np
import PIL
from datetime import datetime


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def train(SMILES1, model_save_path=None, n_neighbors=None, knn_algo='ball_tree', verbose=False):
    X = []
    y = []
    # Loop through each person in the training set
    for class_dir in os.listdir(SMILES1):
        if not os.path.isdir(os.path.join(SMILES1, class_dir)):
            continue

        # Loop through each training image for the current person
        for img_path in image_files_in_folder(os.path.join(SMILES1, class_dir)):
            image = face_recognition.load_image_file(img_path)
            face_bounding_boxes = face_recognition.face_locations(image)

            if len(face_bounding_boxes) != 1:
                # If there are no people (or too many people) in a training image, skip the image.
                if verbose:
                    print("Image {} not suitable for training: {}".format(img_path, "Didn't find a face" if len(face_bounding_boxes) < 1 else "Found more than one face"))
            else:
                # Add face encoding for current image to the training set
                X.append(face_recognition.face_encodings(image, known_face_locations=face_bounding_boxes)[0])
                y.append(class_dir)

    # Determine how many neighbors to use for weighting in the KNN classifier
    if n_neighbors is None:
        n_neighbors = int(round(math.sqrt(len(X))))
        if verbose:
            print("Chose n_neighbors automatically:", n_neighbors)

    # Create and train the KNN classifier
    knn_clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors, algorithm=knn_algo, weights='distance')
    knn_clf.fit(X, y)

    # Save the trained KNN classifier
    if model_save_path is not None:
        with open(model_save_path, 'wb') as f:
            pickle.dump(knn_clf, f)

    return knn_clf

def predict(X_img_path, knn_clf=None, model_path=None, distance_threshold=0.6):
    if not os.path.isfile(X_img_path) or os.path.splitext(X_img_path)[1][1:] not in ALLOWED_EXTENSIONS:
        raise Exception("Invalid image path: {}".format(X_img_path))

    if knn_clf is None and model_path is None:
        raise Exception("Must supply knn classifier either thourgh knn_clf or model_path")

    # Load a trained KNN model (if one was passed in)
    if knn_clf is None:
        with open(model_path, 'rb') as f:
            knn_clf = pickle.load(f)

    # Load image file and find face locations
    X_img = face_recognition.load_image_file(X_img_path)
    X_face_locations = face_recognition.face_locations(X_img)

    # If no faces are found in the image, return an empty result.
    if len(X_face_locations) == 0:
        return []

    # Find encodings for faces in the test iamge
    faces_encodings = face_recognition.face_encodings(X_img, known_face_locations=X_face_locations)

    # Use the KNN model to find the best matches for the test face
    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
    are_matches = [closest_distances[0][i][0] <= distance_threshold for i in range(len(X_face_locations))]

    # Predict classes and remove classifications that aren't within the threshold
    return [(pred, loc) if rec else ("unknown", loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]

def show_prediction_labels_on_image(img_path, predictions):
    pil_image = Image.open(img_path).convert("RGB")
    draw = ImageDraw.Draw(pil_image)

    for name, (top, right, bottom, left) in predictions:
        # Draw a box around the face using the Pillow module
        draw.rectangle(((left, top), (right, bottom)), outline=(0, 0, 255))

        # There's a bug in Pillow where it blows up with non-UTF-8 text
        # when using the default bitmap font
        name = name.encode("UTF-8")

        # Draw a label with a name below the face
        text_width, text_height = draw.textsize(name)
        draw.rectangle(((left, bottom - text_height - 10), (right, bottom)), fill=(0, 0, 255), outline=(0, 0, 255))
        draw.text((left + 6, bottom - text_height - 5), name, fill=(255, 255, 255, 255))

    # Remove the drawing library from memory as per the Pillow docs
    del draw

    # Display the resulting image
    pil_image.show()

def save_prediction_labels_on_image(img_path, predictions):
    pil_image = Image.open(img_path).convert("RGB")
    draw = ImageDraw.Draw(pil_image)

    for name, (top, right, bottom, left) in predictions:
        # Draw a box around the face using the Pillow module
        draw.rectangle(((left, top - 10), (right, bottom)), outline=(0, 0, 255))

        # There's a bug in Pillow where it blows up with non-UTF-8 text
        # when using the default bitmap font
        name = name.encode("UTF-8")

        # Draw a label with a name below the face
        text_width, text_height = draw.textsize(name)
        #draw.rectangle(((left, bottom + 20), (right, bottom)), fill=(0, 0, 255), outline=(0, 0, 255))
        draw.rectangle(((left, bottom - text_height - 10), (right, bottom)), fill=(0, 0, 255), outline=(0, 0, 255))
        #draw.text((left + 6, bottom + 5), name, fill=(255, 255, 255, 255))
        draw.text((left + 6, bottom - 15), name, fill=(255, 255, 255, 255))

    # Remove the drawing library from memory as per the Pillow docs
    del draw

    # Display the resulting image
    pil_image.save(img_path)
    image_file = open(img_path, "rb")
    return b64encode(image_file.read())

# function to convert the JavaScript object into an OpenCV image
def js_to_image(js_reply):
    # decode base64 image
    image_bytes = b64decode(js_reply.split(',')[1])
    # convert bytes to numpy array
    jpg_as_np = np.frombuffer(image_bytes, dtype=np.uint8)
    # decode numpy array into OpenCV BGR image
    img = cv2.imdecode(jpg_as_np, flags=1)

    return img

# function to convert OpenCV Rectangle bounding box image into base64 byte string to be overlayed on video stream
def bbox_to_bytes(bbox_array):
    # convert array into PIL image
    bbox_PIL = PIL.Image.fromarray(bbox_array, 'RGBA')
    iobuf = io.BytesIO()
    # format bbox into png for return
    bbox_PIL.save(iobuf, format='png')
    # format return string
    bbox_bytes = 'data:image/png;base64,{}'.format((str(b64encode(iobuf.getvalue()), 'utf-8')))

    return bbox_bytes

def simpan_capture(data_capture,prefix=''):
    file_timestamp = datetime.now().strftime("%d%M%Y_%H%M%S")
    img = Image.open(io.BytesIO(decodebytes(bytes(data_capture.replace('data:image/jpeg;base64,',''), "utf-8"))))
    file_location = 'Testing/%s_%s.jpg'%(prefix,file_timestamp) # Generate Unique ID
    img.save(file_location)
    return file_location

def simpan_csv(csv_file_path, names, tanggal, waktu, log):
    msg = ""
    with open(csv_file_path, mode='r+', newline='') as file:
        reader = csv.reader(file, delimiter=';')
        data_kehadiran = list(reader)

        # Filter baris berdasarkan tanggal
        data_hari_ini = [row for row in data_kehadiran if row[0] == tanggal]

        for name in names:
            matching_rows = [row for row in data_hari_ini if row[1] == name]
            date_timestamp = datetime.now().strftime("%d/%m/%y, %H:%M:%S")
            # Ambil log dari app.py
            if log == "check in":
                if not matching_rows:
                    
                    if waktu >= "08:00:00" and waktu < "08:30:00":
                        ket = "Hadir"
                    elif waktu >= "08:30:00" and waktu < "08:45:00":
                        ket = "Telat"
                    else:
                        ket = "Alpa"
                        
                    csv_writer = csv.writer(file, delimiter=';')
                    for name in names:
                        csv_writer.writerow([tanggal, name, waktu, '',ket])
                        msg = "Kamu berhasil check in pada, {data_checkin} ".format(data_checkin=date_timestamp)
                else:
                    row = matching_rows[0]
                    msg = "Anda Sudah Check In, {data_checkin} ".format(data_checkin=row[2])
            elif log == "check out":
                # Ambil baris pertama yang cocok (jika ada)
                if matching_rows:
                    row = matching_rows[0]
                    # Cek apakah kolom ke-3 (waktu keluar) kosong atau tidak
                    if not row[3]:
                        # Jika kosong, isi waktu keluar
                        row[3] = waktu
                        print(f"Updated row[3] for {name} to {waktu}")
                        # Kembalikan kursor file ke awal
                        file.seek(0)
                        # Tulis kembali data ke file CSV
                        writer = csv.writer(file, delimiter=';')
                        writer.writerows(data_kehadiran)
                        file.truncate()
                        msg = "Kamu berhasil check out pada, {data_checkin} ".format(data_checkin=date_timestamp)
                    else:
                        msg = "Anda Sudah Check Out, {data_checkin} ".format(data_checkin=row[3])
                else:
                    msg = "Anda Belum Melakukan Check In, Harap check In Terlebih Dahulu"
    return msg
