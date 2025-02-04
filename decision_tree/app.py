from flask import Flask, request, render_template
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# โหลดโมเดลที่บันทึกไว้
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# โหลดข้อมูลทั้งหมด
data = pd.read_csv('diabetes2.csv')
# แปลง DataFrame เป็น HTML
data_html = data.to_html(classes='dataframe', header="true", index=False)

@app.route('/')
def home():
    return render_template('index.html', tables=[data_html], titles=data.columns.values)

@app.route('/predict', methods=['POST'])
def predict():
    # รับข้อมูลจากฟอร์ม
    try:
        Pregnancies = float(request.form['Pregnancies'])
        Glucose = float(request.form['Glucose'])
        BloodPressure = float(request.form['BloodPressure'])
        SkinThickness = float(request.form['SkinThickness'])
        Insulin = float(request.form['Insulin'])
    except ValueError:
        return render_template('index.html', prediction_text='กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', tables=[data_html], titles=data.columns.values)

    # เตรียมข้อมูลสำหรับทำนาย
    input_features = np.array([[Pregnancies, Glucose, BloodPressure, SkinThickness,Insulin]])

    # ทำนายผล
    prediction = model.predict(input_features)
    if prediction[0] == 1:
        outcome = 'เป็นเบาหวาน'
        prediction_class = 'positive'
    else:
        outcome = 'ไม่เป็นเบาหวาน'
        prediction_class = 'negative'

    return render_template('index.html',
                           prediction_text='ผลลัพธ์: {}'.format(outcome),
                           prediction_class=prediction_class,
                           tables=[data_html],
                           titles=data.columns.values)

if __name__ == '__main__':
    app.run(debug=True)
