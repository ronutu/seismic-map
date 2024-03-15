import pandas as pd

df = pd.read_csv(r'C:\Users\Radu\PhpstormProjects\untitled\data\Lista_imobile_expertizate_27_01_2022.csv')

selected_data = df[['Adresa', 'Anul_construirii', 'Numar_de_apartamente', 'Anul_expertizei', 'Clasa_de_risc']]

filtered_data = selected_data[selected_data['Clasa_de_risc'] == "2"]

json_data = filtered_data.to_json(orient='records', lines=True)

with open('output.json', 'w') as file:
    file.write(json_data)
