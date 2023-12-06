from flask import Flask,render_template,request,jsonify,session
#from flask_ngrok import run_with_ngrok
from datetime import datetime
import os,csv
from main import * # import fungsi2 dari main.py

app   = Flask(__name__, static_url_path='/static')
csv_file_path = os.path.join(app.static_folder, 'csv/log.csv')
csv_file_path1 = os.path.join(app.static_folder, 'csv/smiles.csv')

@app.route("/")
@app.route("/aplikasi")
def beranda():
    nav_aplikasi = 'class=active'
    return render_template('aplikasi_new.html',nav_aplikasi=nav_aplikasi)

@app.route("/test")
def test():
    return render_template('aplikasi_new.html')

@app.route("/profile")
def profile():
    nav_profile = 'class=active'
    return render_template('profile_new.html',nav_profile=nav_profile)

@app.route("/about")
def about():
    nav_about = 'class=active'
    return render_template('about_new.html',nav_about=nav_about)
@app.route("/informasi")
def informasi():
    nav_informasi = 'class=active'
    return render_template('informasi_new.html',nav_informasi=nav_informasi)

@app.route('/check_in', methods=['POST'])
def check_in():
    data_capture = request.form['photo']
    file_location = simpan_capture(data_capture,'check_in')
    # Prediksi Photo yang sudah dicapture
    results = predict(file_location, model_path="model/SMILES_FACE_MODEL.clf")
    # Beri Label Pada Image yg berhasil dipredikasi
    encoded_image = save_prediction_labels_on_image(file_location,results)

    # Ambil hasil prediksi
    names = [result[0] for result in results]
    
    # Tanggal hari ini
    tanggal = datetime.now().strftime('%d/%m/%y')
    
    # Waktu prediksi
    sekarang = datetime.now()
    waktu = str(sekarang.strftime('%H:%M:%S'))
    response_data = {}

    # waktu_uji = "07:00:00"
    # Membuat waktu absen dibuka
    if waktu < "08:00:00":
        # cek apakah kode berfungsi 
        print("absen tutup")
        response_data = {
            "hasil": "belum buka",
            "message_person": "Absensi belum terbuka",
            "message_timestamp" : "Absen dibuka pada jam 08:00:00",
            "img_captured" : "",
        }
    # Absen dibuka
    else:
        # Mengambil Nama dari hasil prediksi
        for name in names:
            # Jika nama bukan unknown
            if name !='unknown':
                # Membaca data dari file smiles.csv
                with open(csv_file_path1, 'r') as csvfile:
                    reader = csv.reader(csvfile)
                    # Mengambil daftar nama dari file CSV
                    class_member_names = [row[0] for row in reader]
                # Mencari Nama dari hasil prediksi pada smiles.csv, dan jika ditemukan
                if name in class_member_names:
                    # cek apakah kode berfungsi 
                    print("nama ditemukan")
                    # Log Buat dikirim ke main.py
                    log = "check in"
                    # Menjalankan fungsi yang ada di main.py
                    msg = simpan_csv(csv_file_path, names, tanggal, waktu,log)
                    response_data = {
                        "hasil": name,
                        "message_person": "Selamat Datang, {name} ".format(name=name),
                        "message_timestamp" : msg,
                        "img_captured" : encoded_image.decode('utf-8'),
                    }
                # Jika nama tidak ditemukan dalam smiles.csv
                else:
                    print("nama tidak ditemukan")
                    response_data = {
                        "hasil": "Unknown",
                        "message_person": "Selamat Datang, {name}. Nama Anda Tidak Terdaftaf di kelas Smiles".format(name=name),
                        "message_timestamp": "Harap Coba Kembali",
                        "img_captured": encoded_image.decode('utf-8'),
                    }
            # Jika nama unknown
            else:
                response_data = {
                    "hasil": "Unknown",
                    "message_person": "Wajah Anda belum dikenali oleh sistem ",
                    "message_timestamp" : "Silahkan Coba Lagi",
                    "img_captured" : encoded_image.decode('utf-8'),
                }
    return jsonify(response_data)

@app.route('/check_out', methods=['POST'])
def check_out():
    data_capture = request.form['photo']
    date_timestamp = datetime.now().strftime("%d %B %Y %H:%M:%S")
    file_location = simpan_capture(data_capture,'check_out')
    # Prediksi Photo yang sudah dicapture
    results = predict(file_location, model_path="model/SMILES_FACE_MODEL.clf")
    # Beri Label Pada Image yg berhasil dipredikasi
    encoded_image = save_prediction_labels_on_image(file_location,results)

    # Ambil hasil prediksi
    names = [result[0] for result in results]
    
    # Tanggal hari ini
    tanggal = datetime.now().strftime('%d/%m/%y')
    
    # Waktu prediksi
    sekarang = datetime.now()
    waktu = sekarang.strftime('%H:%M:%S')
    response_data = {}
    # Tambahkan data ke file CSV
    for name in names:
        if name !='unknown':
            # Log Buat dikirim ke main.py
            log="check out"
            msg = simpan_csv(csv_file_path,names,tanggal,waktu,log)
            #session["name"] = name
            response_data = {
                "hasil": name,
                "message_person": "Selamat Datang, {name} ".format(name=name),
                "message_timestamp" : msg,
                "img_captured" : encoded_image.decode('utf-8'),
            }
        else:
            response_data = {
                "hasil": "Unknown",
                "message_person": "Wajah Anda belum dikenali oleh sistem ",
                "message_timestamp" : "",
                "img_captured" : encoded_image.decode('utf-8'),
            }
    return jsonify(response_data)

@app.route('/data')
def data():
    with open(csv_file_path, mode='r', newline='') as file:
        # Menggunakan tanda semikolon sebagai pemisah dalam file CSV
        reader = csv.reader(file, delimiter=';')
        data_kehadiran = list(reader)

    return render_template('data.html', data_kehadiran=data_kehadiran)

@app.route('/get_data_user', methods=['POST'])
def get_data_user():
    data_user = request.form['data_user']
    if data_user:
        with open(csv_file_path, mode='r', newline='') as file:
            # Menggunakan tanda semikolon sebagai pemisah dalam file CSV
            reader = csv.reader(file, delimiter=';')
            #data_kehadiran = list(reader)
            
            #reader = csv.DictReader(file, delimiter=';')
            data_kehadiran = [row for row in reader if row[1] == data_user]
            #print(session["name"])

        return render_template('data_html.html', data_kehadiran=data_kehadiran)

@app.route('/deleteTestingFiles', methods=['POST'])
def delete_testing_files():
    testing_folder = "Testing"  # Gantilah dengan rute folder "Testing" yang sesuai
    for filename in os.listdir(testing_folder):
        file_path = os.path.join(testing_folder, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}: {e}")

    return jsonify({"message": "File di folder Testing telah dihapus."})

if __name__ == '__main__':
    #run_with_ngrok(app)
    #app.run()
    
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
