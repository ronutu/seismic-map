# Seismic risk map of Bucharest
**Winner of the HackTheNews 2023 Hackathon, held by Softbinator, for the most technical solution.**

**Description**:\
The goal of this project is to showcase the buildings of Bucharest with a high seismic risk. First of all let's \
understand how does the seismic design category(SDC) works in Romania:\
a) **Rs I class (R1)**: Buildings with a high risk of collapse in the design earthquake\
b) **Rs II class (R2)**: Buildings that may suffer major structural degradation, but whose stability is unlikely to be affected\
c) **Rs III class(R3)**: Buildings that may show minor structural degradation without significantly affecting safety\
d) **Rs IV class (R4)**: Constructions expected to have a seismic response similar to that of buildings designed according to current codes

Source: https://evz.ro/ce-inseamna-risc-seismic.html

This project shows the buildings with R1 and R2 seismic risk. The website uses the Google Maps API and you can also use the Google Street View option to show exactly how a building with high seismic risk looks like.

The data is taken from AMCCRS (Administratia municipala pentru consolidarea cladirilor cu risc seismic):
https://amccrs-pmb.ro/lista-imobile-2/

# Quick Start
Create a new `.env` file in and add your Google Maps API key like this:
```
MAPS_API_KEY=YOUR_API_KEY
```

Start the server:
```
node index.js
```

Open your browser and navigate to `http://localhost:3000` to see the app in action.
