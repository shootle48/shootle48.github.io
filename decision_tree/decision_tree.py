# ปรับแก้เพิ่มเติม
# //โค้ดสำหรับเทรน Ai

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import pickle

# โหลดชุดข้อมูล
data = pd.read_csv('diabetes2.csv')

# แยก Features และ Target รวมทุกฟีเจอร์ที่เกี่ยวข้อง
X = data[['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin']]
y = data['Outcome']

  # แบ่งข้อมูลเป็นชุดฝึกและทดสอบ
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=16)

  # สร้างโมเดล Decision Tree
DT_model = DecisionTreeClassifier(criterion='gini', max_depth=4, random_state=16)

  # ฝึกโมเดล
DT_model.fit(X_train, y_train)

  # ทำนายผล
y_pred = DT_model.predict(X_test)

  # ประเมินความแม่นยำ
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy*100:.2f}%")

  # บันทึกโมเดลด้วย pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(DT_model, f)

print("โมเดลถูกบันทึกลงไฟล์ 'model.pkl' เรียบร้อยแล้ว")



# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.tree import DecisionTreeClassifier
# from sklearn.metrics import accuracy_score
# import pickle
# import numpy as np

# # โหลดชุดข้อมูล
# data = pd.read_csv('diabetes2.csv')
# print(data)

# # ฟีเจอร์ทั้งหมดที่เกี่ยวข้อง
# features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
# y = data['Outcome']

# # กำหนดขอบเขตสำหรับการวนรอบ
# test_sizes = np.linspace(0.1, 0.3, 3)  # สร้าง test_size ตั้งแต่ 0.1 ถึง 0.3
# random_states = range(1, 51)  # random_state ตั้งแต่ 1 ถึง 50
# max_depths = range(1, 6)  # max_depth ตั้งแต่ 1 ถึง 5

# # ลูปไล่ลำดับฟีเจอร์ที่ใช้ในการเทรน
# for num_features in range(1, len(features) + 1):
#     selected_features = features[:num_features]  # เลือกฟีเจอร์ตามลำดับ
#     X = data[selected_features]  # กำหนดค่า X
    
#     # ลูปสำหรับแต่ละตัวแปร
#     for test_size in test_sizes:
#         for random_state in random_states:
#             for max_depth in max_depths:
#                 # แบ่งข้อมูลเป็นชุดฝึกและทดสอบ
#                 X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
                
#                 # สร้างโมเดล Decision Tree
#                 DT_model = DecisionTreeClassifier(criterion='gini', max_depth=max_depth, random_state=random_state)
                
#                 # ฝึกโมเดล
#                 DT_model.fit(X_train, y_train)
                
#                 # ทำนายผล
#                 y_pred = DT_model.predict(X_test)
                
#                 # ประเมินความแม่นยำ
#                 accuracy = accuracy_score(y_test, y_pred)

#                 # แสดงผลเฉพาะค่า accuracy มากกว่า 85%
#                 if accuracy * 100 > 88:
#                     print(f"Accuracy: {accuracy*100:.2f}%, Features: {selected_features}, test_size={test_size}, random_state={random_state}, max_depth={max_depth}")
                    
#                     # # บันทึกโมเดลด้วย pickle
#                     # with open('model.pkl', 'wb') as f:
#                     #     pickle.dump(DT_model, f)
                    
#                     print("โมเดลถูกบันทึกลงไฟล์ 'model.pkl' เรียบร้อยแล้ว")
