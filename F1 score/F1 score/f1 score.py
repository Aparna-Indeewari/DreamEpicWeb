import os
import numpy as np
from classification_model_test import predict
import cv2 as cv
from sklearn.metrics import (
    confusion_matrix,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)
import matplotlib.pyplot as plt
import seaborn as sns

# create folder which  has both positive and negative images
# rename positive images as "Cheated(x).png" and negative images as Notcheted(x).png

names = os.listdir("../Images/test")  # test folder path

true_val = []
predict_val = []

for name in names:
    label = name.split()[0]
    if label == "Cheated":
        true_val.append(0)
    if label == "Notcheated":
        true_val.append(1)

    try:
        image = cv.imread(f"../Images/test/{name}")
        out_put = predict(image)
        predict_val.append(out_put)
    except Exception as e:
        print(e)

if not len(true_val) == 0 and not len(predict_val) == 0:
    true_val = np.array(true_val)
    predict_val = np.array(predict_val)

    conf_matrix = confusion_matrix(true_val, predict_val)
    plt.figure(figsize=(8, 8))
    sns.set(font_scale=1.5)

    ax = sns.heatmap(
        conf_matrix,  # confusion matrix 2D array
        annot=True,  # show numbers in the cells
        fmt='d',  # show numbers as integers
        cbar=False,  # don't show the color bar
        cmap='flag',  # customize color map
        vmax=175  # to get better color contrast
    )
    plt.title("Confusion matrix")
    ax.set_xlabel("Predicted", labelpad=20)
    ax.set_ylabel("Actual", labelpad=20)
    plt.show()

    accuracy = accuracy_score(true_val, predict_val)
    precision = precision_score(true_val, predict_val)
    recall = recall_score(true_val, predict_val)
    f1score = f1_score(true_val, predict_val)

    print(f"accuracy  = {accuracy}")
    print(f"Precision = {precision}")
    print(f"Recall    = {recall}")
    print(f"F1 Score  = {f1score}")

else:
    print("Error has occurred check again")
