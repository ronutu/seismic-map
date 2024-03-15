import json

with open(r"C:\Users\Radu\PhpstormProjects\untitled\addressesEtc2.json", "r") as f:
    data1 = json.load(f)

with open(r"C:\Users\Radu\PhpstormProjects\untitled\addressesLatLng2.json", "r") as f:
    data2 = json.load(f)

for i in range(len(data2)):
    data2[i]["yearOfConstruction"] = data1[i]["yearOfConstruction"]
    data2[i]["numberOfApartments"] = data1[i]["numberOfApartments"]
    data2[i]["yearOfExpertise"] = data1[i]["yearOfExpertise"]
    data2[i]["seismicRisk"] = data1[i]["seismicRisk"]

with open("addresses2.json", "w") as f:
    json.dump(data2, f, indent=4)
