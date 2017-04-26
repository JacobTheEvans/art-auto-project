import xlrd
from collections import OrderedDict
import simplejson as json

def loadData(file_name):
    return xlrd.open_workbook(file_name)


def getFirstSheet(doc):
    return doc.sheet_by_index(0)


def loadDataIntoObject(sh):
    result = []
    for rownum in range(1, sh.nrows):
        temp = OrderedDict()
        row_values = sh.row_values(rownum)
        temp["item"] = row_values[0]
        temp["METRAGE"] = row_values[1]
        temp["HAUT"] = row_values[2]
        temp["LOKAL2"] = row_values[3]
        temp["QTY3"] = row_values[4]
        temp["LOKAL3"] = row_values[5]
        temp["QTY5"] = row_values[6]
        temp["LOKAL5"] = row_values[7]
        result.append(temp)
    return result


def objectToJSON(obj):
    return json.dumps(obj)


def saveData(j):
    with open("./server/data/data.json", "w") as f:
        f.write(j)

def main():
    file_name = "./stock.xlsx"
    print("[+] Stock data scrapper running")
    print("[+] Loading Excel Sheet from file " + file_name)
    doc = loadData(file_name)
    print("[+] Success data loaded")
    print("[+] Extracting first sheet")
    sh = getFirstSheet(doc)
    print("[+] Success first sheet loaded")
    print("[+] Converting data to python object")
    pythonData = loadDataIntoObject(sh)
    print("[+] Success data in memory")
    print("[+] Converting data to json object")
    jsonData = objectToJSON(pythonData)
    print("[+] Success data is now json")
    print("[+] Saving data to application json file")
    saveData(jsonData)
    print("[+] Success data is saved in public web server")

if __name__ == "__main__":
    main()
