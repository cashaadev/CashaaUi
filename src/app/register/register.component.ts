import { AppSettings } from './../app-settings';
import { Router } from '@angular/router';
import { LoginModel } from './../models/login';
import { Registermodel } from './../models/registermodel';
import { RegisterService } from './../service/registerservice/register.service';
import { RegisterInterface } from './../interface/register-interface';
import { SharedService } from './../service/shared.service';
import { ValidationmessageserviceService } from './../service/validationmessageservice.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cities } from './../models/cities';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { SafeHtml,DomSanitizationService } from "@angular/platform-browser";
import { UserType } from './../enums/user-type.enum';
import { Responsecode } from './../enums/responsecode.enum';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {


    cityarray: any[] =
    [
        {
            "Key": 10763,
            "Name": "Abu Dhabi",
            "FullName": "Abu Dhabi, United Arab Emirates",
            "Lat": 24.47,
            "Long": 54.37,
            "CurrencyID": 12,
            "Currency": "AED",
            "CountryCode": "+971"
        },
        {
            "Key": 10764,
            "Name": "Dubai",
            "FullName": "Dubai, United Arab Emirates",
            "Lat": 25.2,
            "Long": 55.27,
            "CurrencyID": 12,
            "Currency": "AED",
            "CountryCode": "+971"
        },
        {
            "Key": 10765,
            "Name": "Sharjah",
            "FullName": "Sharjah, United Arab Emirates",
            "Lat": 25.36,
            "Long": 55.39,
            "CurrencyID": 12,
            "Currency": "AED",
            "CountryCode": "+971"
        },
        {
            "Key": 9177,
            "Name": "Kabul",
            "FullName": "Kabul, Afghanistan",
            "Lat": 34.53,
            "Long": 69.17,
            "CurrencyID": 13,
            "Currency": "AFN",
            "CountryCode": "+93"
        },
        {
            "Key": 9178,
            "Name": "Tirana",
            "FullName": "Tirana, Albania",
            "Lat": 41.33,
            "Long": 19.82,
            "CurrencyID": 14,
            "Currency": "ALL",
            "CountryCode": "+355"
        },
        {
            "Key": 9292,
            "Name": "Yerevan",
            "FullName": "Yerevan, Armenia",
            "Lat": 40.18,
            "Long": 44.52,
            "CurrencyID": 15,
            "Currency": "AMD",
            "CountryCode": "+374"
        },
        {
            "Key": 9185,
            "Name": "Huambo",
            "FullName": "Huambo, Angola",
            "Lat": -12.77,
            "Long": 15.73,
            "CurrencyID": 16,
            "Currency": "AOA",
            "CountryCode": "+244"
        },
        {
            "Key": 9186,
            "Name": "Luanda",
            "FullName": "Luanda, Angola",
            "Lat": -8.84,
            "Long": 13.23,
            "CurrencyID": 16,
            "Currency": "AOA",
            "CountryCode": "+244"
        },
        {
            "Key": 9187,
            "Name": "Avellaneda",
            "FullName": "Avellaneda, Argentina",
            "Lat": -34.67,
            "Long": -58.37,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9188,
            "Name": "Bahia Blanca",
            "FullName": "Bahia Blanca, Argentina",
            "Lat": -38.72,
            "Long": -62.27,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9189,
            "Name": "Banfield",
            "FullName": "Banfield, Argentina",
            "Lat": -34.75,
            "Long": -58.38,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9190,
            "Name": "Bariloche",
            "FullName": "Bariloche, Argentina",
            "Lat": -41.15,
            "Long": -71.3,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9191,
            "Name": "Bella Vista",
            "FullName": "Bella Vista, Argentina",
            "Lat": -35.23,
            "Long": -59.88,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9192,
            "Name": "Berazategui",
            "FullName": "Berazategui, Argentina",
            "Lat": -34.77,
            "Long": -58.22,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9193,
            "Name": "Bernal",
            "FullName": "Bernal, Argentina",
            "Lat": -34.7,
            "Long": -58.28,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9194,
            "Name": "Boulogne Sur Mer",
            "FullName": "Boulogne Sur Mer, Argentina",
            "Lat": -34.5,
            "Long": -58.57,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9195,
            "Name": "Buenos Aires",
            "FullName": "Buenos Aires, Argentina",
            "Lat": -34.6,
            "Long": -58.38,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9196,
            "Name": "Burzaco",
            "FullName": "Burzaco, Argentina",
            "Lat": -34.82,
            "Long": -58.37,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9197,
            "Name": "Campana",
            "FullName": "Campana, Argentina",
            "Lat": -34.17,
            "Long": -58.92,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9198,
            "Name": "Caseros",
            "FullName": "Caseros, Argentina",
            "Lat": -24.78,
            "Long": -65.45,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9199,
            "Name": "Castelar",
            "FullName": "Castelar, Argentina",
            "Lat": -34.65,
            "Long": -58.64,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9200,
            "Name": "Catamarca",
            "FullName": "Catamarca, Argentina",
            "Lat": -28.47,
            "Long": -65.78,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9201,
            "Name": "Cipolletti",
            "FullName": "Cipolletti, Argentina",
            "Lat": -38.93,
            "Long": -67.99,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9202,
            "Name": "Ciudad Evita",
            "FullName": "Ciudad Evita, Argentina",
            "Lat": -34.72,
            "Long": -58.53,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9203,
            "Name": "Ciudad Jardin",
            "FullName": "Ciudad Jardin, Argentina",
            "Lat": -34.6,
            "Long": -58.58,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9204,
            "Name": "Ciudadela",
            "FullName": "Ciudadela, Argentina",
            "Lat": -34.63,
            "Long": -58.53,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9205,
            "Name": "Comodoro Rivadavia",
            "FullName": "Comodoro Rivadavia, Argentina",
            "Lat": -45.86,
            "Long": -67.48,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9206,
            "Name": "Concepcion Del Uruguay",
            "FullName": "Concepcion Del Uruguay, Argentina",
            "Lat": -32.48,
            "Long": -58.23,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9207,
            "Name": "Concordia",
            "FullName": "Concordia, Argentina",
            "Lat": -31.4,
            "Long": -58.03,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9208,
            "Name": "Cordoba",
            "FullName": "Cordoba, Argentina",
            "Lat": -31.42,
            "Long": -64.18,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9209,
            "Name": "Corrientes",
            "FullName": "Corrientes, Argentina",
            "Lat": -27.48,
            "Long": -58.82,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9210,
            "Name": "Don Torcuato",
            "FullName": "Don Torcuato, Argentina",
            "Lat": -34.5,
            "Long": -58.63,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9211,
            "Name": "El Palomar",
            "FullName": "El Palomar, Argentina",
            "Lat": -34.54,
            "Long": -58.62,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9212,
            "Name": "Ezeiza",
            "FullName": "Ezeiza, Argentina",
            "Lat": -34.85,
            "Long": -58.52,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9213,
            "Name": "Florencio Varela",
            "FullName": "Florencio Varela, Argentina",
            "Lat": -34.8,
            "Long": -58.28,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9214,
            "Name": "Formosa",
            "FullName": "Formosa, Argentina",
            "Lat": 26.18,
            "Long": 58.17,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9215,
            "Name": "General Roca",
            "FullName": "General Roca, Argentina",
            "Lat": -39.03,
            "Long": -67.58,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9216,
            "Name": "Gerli",
            "FullName": "Gerli, Argentina",
            "Lat": -34.68,
            "Long": -58.37,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9217,
            "Name": "Gonzales Catan",
            "FullName": "Gonzales Catan, Argentina",
            "Lat": -34.77,
            "Long": -58.65,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9218,
            "Name": "Goya",
            "FullName": "Goya, Argentina",
            "Lat": -29.13,
            "Long": -59.25,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9219,
            "Name": "Grand Bourg",
            "FullName": "Grand Bourg, Argentina",
            "Lat": -34.48,
            "Long": -58.72,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9220,
            "Name": "Gregorio De Laferrere",
            "FullName": "Gregorio De Laferrere, Argentina",
            "Lat": -34.75,
            "Long": -58.58,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9221,
            "Name": "Gualeguaychu",
            "FullName": "Gualeguaychu, Argentina",
            "Lat": -33.02,
            "Long": -58.52,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9222,
            "Name": "Hurlingham",
            "FullName": "Hurlingham, Argentina",
            "Lat": -34.6,
            "Long": -58.63,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9223,
            "Name": "Isidro Casanova",
            "FullName": "Isidro Casanova, Argentina",
            "Lat": -34.7,
            "Long": -58.58,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9224,
            "Name": "Ituzaingo",
            "FullName": "Ituzaingo, Argentina",
            "Lat": -34.66,
            "Long": -58.68,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9225,
            "Name": "Jose C Paz",
            "FullName": "Jose C Paz, Argentina",
            "Lat": -34.51,
            "Long": -58.75,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9226,
            "Name": "Jujuy Province",
            "FullName": "Jujuy Province, Argentina",
            "Lat": -23.75,
            "Long": -65.5,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9227,
            "Name": "Junin",
            "FullName": "Junin, Argentina",
            "Lat": -34.58,
            "Long": -60.95,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9228,
            "Name": "La Plata",
            "FullName": "La Plata, Argentina",
            "Lat": -34.92,
            "Long": -57.95,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9229,
            "Name": "La Rioja",
            "FullName": "La Rioja, Argentina",
            "Lat": -29.43,
            "Long": -66.85,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9230,
            "Name": "Lanus",
            "FullName": "Lanus, Argentina",
            "Lat": -34.7,
            "Long": -58.39,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9231,
            "Name": "Las Heras",
            "FullName": "Las Heras, Argentina",
            "Lat": -46.54,
            "Long": -68.94,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9232,
            "Name": "Libertad",
            "FullName": "Libertad, Argentina",
            "Lat": 37.18,
            "Long": 67.37,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9233,
            "Name": "Lomas De Zamora",
            "FullName": "Lomas De Zamora, Argentina",
            "Lat": -34.76,
            "Long": -58.43,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9234,
            "Name": "Lujan",
            "FullName": "Lujan, Argentina",
            "Lat": -34.57,
            "Long": -59.1,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9235,
            "Name": "Mar Del Plata",
            "FullName": "Mar Del Plata, Argentina",
            "Lat": -38,
            "Long": -57.55,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9236,
            "Name": "Martinez",
            "FullName": "Martinez, Argentina",
            "Lat": -34.48,
            "Long": -58.5,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9237,
            "Name": "Mendoza",
            "FullName": "Mendoza, Argentina",
            "Lat": -32.88,
            "Long": -68.82,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9238,
            "Name": "Merlo",
            "FullName": "Merlo, Argentina",
            "Lat": -34.67,
            "Long": -58.72,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9239,
            "Name": "Monte Chingolo",
            "FullName": "Monte Chingolo, Argentina",
            "Lat": -34.73,
            "Long": -58.35,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9240,
            "Name": "Monte Grande",
            "FullName": "Monte Grande, Argentina",
            "Lat": -34.82,
            "Long": -58.47,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9241,
            "Name": "Moreno",
            "FullName": "Moreno, Argentina",
            "Lat": -34.64,
            "Long": -58.79,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9242,
            "Name": "Moron",
            "FullName": "Moron, Argentina",
            "Lat": -34.65,
            "Long": -58.62,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9243,
            "Name": "Necochea",
            "FullName": "Necochea, Argentina",
            "Lat": -38.55,
            "Long": -58.73,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9244,
            "Name": "Neuquen",
            "FullName": "Neuquen, Argentina",
            "Lat": -38.95,
            "Long": -68.07,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9245,
            "Name": "Olavarria",
            "FullName": "Olavarria, Argentina",
            "Lat": -36.89,
            "Long": -60.32,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9246,
            "Name": "Olivos",
            "FullName": "Olivos, Argentina",
            "Lat": -34.5,
            "Long": -58.48,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9247,
            "Name": "Parana",
            "FullName": "Parana, Argentina",
            "Lat": -31.73,
            "Long": -60.53,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9248,
            "Name": "Parque San Martin",
            "FullName": "Parque San Martin, Argentina",
            "Lat": -34.67,
            "Long": -58.46,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9249,
            "Name": "Pergamino",
            "FullName": "Pergamino, Argentina",
            "Lat": -33.88,
            "Long": -60.57,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9250,
            "Name": "Posadas",
            "FullName": "Posadas, Argentina",
            "Lat": -27.37,
            "Long": -55.9,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9251,
            "Name": "Quilmes",
            "FullName": "Quilmes, Argentina",
            "Lat": -34.72,
            "Long": -58.27,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9252,
            "Name": "Rafael Castillo",
            "FullName": "Rafael Castillo, Argentina",
            "Lat": -34.72,
            "Long": -58.62,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9253,
            "Name": "Rafaela",
            "FullName": "Rafaela, Argentina",
            "Lat": -31.27,
            "Long": -61.48,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9254,
            "Name": "Ramos Mejia",
            "FullName": "Ramos Mejia, Argentina",
            "Lat": -34.66,
            "Long": -58.55,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9255,
            "Name": "Reconquista",
            "FullName": "Reconquista, Argentina",
            "Lat": -29.23,
            "Long": -59.93,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9256,
            "Name": "Remedios De Escalada",
            "FullName": "Remedios De Escalada, Argentina",
            "Lat": -34.72,
            "Long": -58.38,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9257,
            "Name": "Resistencia",
            "FullName": "Resistencia, Argentina",
            "Lat": -27.45,
            "Long": -58.99,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9258,
            "Name": "Rio Cuarto",
            "FullName": "Rio Cuarto, Argentina",
            "Lat": -33.13,
            "Long": -64.35,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9259,
            "Name": "Rio Gallegos",
            "FullName": "Rio Gallegos, Argentina",
            "Lat": -51.63,
            "Long": -69.22,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9260,
            "Name": "Roque Saenz Pena",
            "FullName": "Roque Saenz Pena, Argentina",
            "Lat": -26.78,
            "Long": -60.45,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9261,
            "Name": "Rosario",
            "FullName": "Rosario, Argentina",
            "Lat": -32.95,
            "Long": -60.67,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9262,
            "Name": "Salta",
            "FullName": "Salta, Argentina",
            "Lat": -24.78,
            "Long": -65.42,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9263,
            "Name": "San Fernando",
            "FullName": "San Fernando, Argentina",
            "Lat": -34.45,
            "Long": -58.62,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9264,
            "Name": "San Francisco Solano",
            "FullName": "San Francisco Solano, Argentina",
            "Lat": -34.77,
            "Long": -58.32,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9265,
            "Name": "San Isidro",
            "FullName": "San Isidro, Argentina",
            "Lat": -32.95,
            "Long": -64.17,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9266,
            "Name": "San Juan",
            "FullName": "San Juan, Argentina",
            "Lat": 31.53,
            "Long": 68.53,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9267,
            "Name": "San Justo",
            "FullName": "San Justo, Argentina",
            "Lat": -34.68,
            "Long": -58.56,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9268,
            "Name": "San Luis",
            "FullName": "San Luis, Argentina",
            "Lat": 33.3,
            "Long": 66.35,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9269,
            "Name": "San Martin",
            "FullName": "San Martin, Argentina",
            "Lat": -32.72,
            "Long": -60.74,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9270,
            "Name": "San Miguel",
            "FullName": "San Miguel, Argentina",
            "Lat": -26.81,
            "Long": -65.22,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9271,
            "Name": "San Miguel De Tucuman",
            "FullName": "San Miguel De Tucuman, Argentina",
            "Lat": -26.81,
            "Long": -65.22,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9272,
            "Name": "San Nicolas De Los Arroyos",
            "FullName": "San Nicolas De Los Arroyos, Argentina",
            "Lat": -33.34,
            "Long": -60.23,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9273,
            "Name": "San Rafael",
            "FullName": "San Rafael, Argentina",
            "Lat": -34.62,
            "Long": -68.33,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9274,
            "Name": "San Ramon De La Nueva Oran",
            "FullName": "San Ramon De La Nueva Oran, Argentina",
            "Lat": -23.15,
            "Long": -64.38,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9275,
            "Name": "San Salvador De Jujuy",
            "FullName": "San Salvador De Jujuy, Argentina",
            "Lat": -24.19,
            "Long": -65.3,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9276,
            "Name": "Santa Fe De La Vera Cruz",
            "FullName": "Santa Fe De La Vera Cruz, Argentina",
            "Lat": 31.63,
            "Long": 60.7,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9277,
            "Name": "Santa Rosa",
            "FullName": "Santa Rosa, Argentina",
            "Lat": 36.62,
            "Long": 64.28,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9278,
            "Name": "Santiago Del Estero",
            "FullName": "Santiago Del Estero, Argentina",
            "Lat": -27.8,
            "Long": -64.26,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9279,
            "Name": "Sarandi",
            "FullName": "Sarandi, Argentina",
            "Lat": 34.68,
            "Long": 58.33,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9280,
            "Name": "Tandil",
            "FullName": "Tandil, Argentina",
            "Lat": -37.32,
            "Long": -59.13,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9281,
            "Name": "Temperley",
            "FullName": "Temperley, Argentina",
            "Lat": -34.78,
            "Long": -58.41,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9282,
            "Name": "Tigre, Buenos Aires",
            "FullName": "Tigre, Buenos Aires, Argentina",
            "Lat": -34.43,
            "Long": -58.58,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9283,
            "Name": "Trelew",
            "FullName": "Trelew, Argentina",
            "Lat": -43.25,
            "Long": -65.31,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9284,
            "Name": "Ushuaia",
            "FullName": "Ushuaia, Argentina",
            "Lat": 54.8,
            "Long": 68.3,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9285,
            "Name": "Venado Tuerto",
            "FullName": "Venado Tuerto, Argentina",
            "Lat": -33.75,
            "Long": -61.97,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9286,
            "Name": "Villa Maria",
            "FullName": "Villa Maria, Argentina",
            "Lat": 32.41,
            "Long": 63.23,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9287,
            "Name": "Villa Mercedes",
            "FullName": "Villa Mercedes, Argentina",
            "Lat": -33.73,
            "Long": -65.39,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9288,
            "Name": "Villa Tesei",
            "FullName": "Villa Tesei, Argentina",
            "Lat": -34.6,
            "Long": -58.62,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9289,
            "Name": "Wilde",
            "FullName": "Wilde, Argentina",
            "Lat": -34.7,
            "Long": -58.32,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9290,
            "Name": "Yerba Buena",
            "FullName": "Yerba Buena, Argentina",
            "Lat": -26.82,
            "Long": -65.32,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9291,
            "Name": "Zarate",
            "FullName": "Zarate, Argentina",
            "Lat": -34.1,
            "Long": -59.03,
            "CurrencyID": 17,
            "Currency": "ARS",
            "CountryCode": "+54"
        },
        {
            "Key": 9294,
            "Name": "Adelaide",
            "FullName": "Adelaide, Australia",
            "Lat": -34.93,
            "Long": 138.6,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9295,
            "Name": "Blacktown",
            "FullName": "Blacktown, Australia",
            "Lat": -33.77,
            "Long": 150.91,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9296,
            "Name": "Blaxland",
            "FullName": "Blaxland, Australia",
            "Lat": -33.75,
            "Long": 150.6,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9297,
            "Name": "Bondi Junction",
            "FullName": "Bondi Junction, Australia",
            "Lat": -33.89,
            "Long": 151.25,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9298,
            "Name": "Brisbane",
            "FullName": "Brisbane, Australia",
            "Lat": -27.47,
            "Long": 153.03,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9299,
            "Name": "Broadbeach",
            "FullName": "Broadbeach, Australia",
            "Lat": -28.03,
            "Long": 153.43,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9300,
            "Name": "Castle Hill",
            "FullName": "Castle Hill, Australia",
            "Lat": -33.73,
            "Long": 151,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9301,
            "Name": "Chatswood",
            "FullName": "Chatswood, Australia",
            "Lat": -33.8,
            "Long": 151.18,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9302,
            "Name": "Cronulla",
            "FullName": "Cronulla, Australia",
            "Lat": -34.06,
            "Long": 151.15,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9303,
            "Name": "Darlinghurst",
            "FullName": "Darlinghurst, Australia",
            "Lat": -33.88,
            "Long": 151.22,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9304,
            "Name": "Darwin",
            "FullName": "Darwin, Australia",
            "Lat": -12.45,
            "Long": 130.83,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9305,
            "Name": "Dee Why",
            "FullName": "Dee Why, Australia",
            "Lat": -33.75,
            "Long": 151.29,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9306,
            "Name": "Fremantle",
            "FullName": "Fremantle, Australia",
            "Lat": -32.06,
            "Long": 115.74,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9307,
            "Name": "Gold Coast",
            "FullName": "Gold Coast, Australia",
            "Lat": -28.02,
            "Long": 153.4,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9308,
            "Name": "Hornsby",
            "FullName": "Hornsby, Australia",
            "Lat": -33.7,
            "Long": 151.1,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9309,
            "Name": "Kellyville",
            "FullName": "Kellyville, Australia",
            "Lat": -33.71,
            "Long": 150.95,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9310,
            "Name": "Manly",
            "FullName": "Manly, Australia",
            "Lat": -33.8,
            "Long": 151.28,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9311,
            "Name": "Maroochydore",
            "FullName": "Maroochydore, Australia",
            "Lat": -26.65,
            "Long": 153.1,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9312,
            "Name": "Melbourne",
            "FullName": "Melbourne, Australia",
            "Lat": -37.81,
            "Long": 144.96,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9313,
            "Name": "New South Wales",
            "FullName": "New South Wales, Australia",
            "Lat": -32.16,
            "Long": 147.02,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9314,
            "Name": "Palm Beach",
            "FullName": "Palm Beach, Australia",
            "Lat": -33.6,
            "Long": 151.32,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9315,
            "Name": "Parramatta",
            "FullName": "Parramatta, Australia",
            "Lat": -33.81,
            "Long": 151,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9316,
            "Name": "Perth",
            "FullName": "Perth, Australia",
            "Lat": -31.95,
            "Long": 115.86,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9317,
            "Name": "Point Cook",
            "FullName": "Point Cook, Australia",
            "Lat": -37.91,
            "Long": 144.75,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9318,
            "Name": "Pyrmont",
            "FullName": "Pyrmont, Australia",
            "Lat": -33.88,
            "Long": 151.2,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9319,
            "Name": "Richmond",
            "FullName": "Richmond, Australia",
            "Lat": -33.6,
            "Long": 150.75,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9320,
            "Name": "Rouse Hill",
            "FullName": "Rouse Hill, Australia",
            "Lat": -33.68,
            "Long": 150.92,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9321,
            "Name": "Ryde",
            "FullName": "Ryde, Australia",
            "Lat": -33.82,
            "Long": 151.1,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9322,
            "Name": "Sidney",
            "FullName": "Sidney, Australia",
            "Lat": -33.87,
            "Long": 151.21,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9323,
            "Name": "Strathfield",
            "FullName": "Strathfield, Australia",
            "Lat": -33.88,
            "Long": 151.08,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9324,
            "Name": "Sunshine Coast",
            "FullName": "Sunshine Coast, Australia",
            "Lat": -26.65,
            "Long": 153.07,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9325,
            "Name": "Surry Hills",
            "FullName": "Surry Hills, Australia",
            "Lat": -33.89,
            "Long": 151.21,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9326,
            "Name": "Sutherland",
            "FullName": "Sutherland, Australia",
            "Lat": -34.03,
            "Long": 151.06,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9327,
            "Name": "Sydney",
            "FullName": "Sydney, Australia",
            "Lat": -33.87,
            "Long": 151.21,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9329,
            "Name": "Werribee",
            "FullName": "Werribee, Australia",
            "Lat": -37.9,
            "Long": 144.66,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9330,
            "Name": "West Melbourne",
            "FullName": "West Melbourne, Australia",
            "Lat": -37.81,
            "Long": 144.93,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9331,
            "Name": "Wetherill Park",
            "FullName": "Wetherill Park, Australia",
            "Lat": -33.85,
            "Long": 150.91,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9332,
            "Name": "Mornington Peninsula",
            "FullName": "Mornington Peninsula, Australia",
            "Lat": -38.35,
            "Long": 145.06,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9333,
            "Name": "Geelong",
            "FullName": "Geelong, Australia",
            "Lat": -38.15,
            "Long": 144.35,
            "CurrencyID": 18,
            "Currency": "AUD",
            "CountryCode": "+61"
        },
        {
            "Key": 9293,
            "Name": "Oranjestad",
            "FullName": "Oranjestad, Aruba",
            "Lat": 12.52,
            "Long": -70.04,
            "CurrencyID": 19,
            "Currency": "AWG",
            "CountryCode": "+297"
        },
        {
            "Key": 9341,
            "Name": "Baku",
            "FullName": "Baku, Azerbaijan",
            "Lat": 40.3,
            "Long": 47.7,
            "CurrencyID": 20,
            "Currency": "AZN",
            "CountryCode": "+994"
        },
        {
            "Key": 9364,
            "Name": "Sarajevo",
            "FullName": "Sarajevo, Bosnia And Herzegovina",
            "Lat": 43.87,
            "Long": 18.42,
            "CurrencyID": 21,
            "Currency": "BAM",
            "CountryCode": "+387"
        },
        {
            "Key": 9345,
            "Name": "Bridgetown",
            "FullName": "Bridgetown, Barbados",
            "Lat": 13.11,
            "Long": -59.61,
            "CurrencyID": 22,
            "Currency": "BBD",
            "CountryCode": "+1"
        },
        {
            "Key": 9344,
            "Name": "Dhaka",
            "FullName": "Dhaka, Bangladesh",
            "Lat": 23.7,
            "Long": 90.37,
            "CurrencyID": 23,
            "Currency": "BDT",
            "CountryCode": "+880"
        },
        {
            "Key": 9453,
            "Name": "Burgas",
            "FullName": "Burgas, Bulgaria",
            "Lat": 42.5,
            "Long": 27.47,
            "CurrencyID": 24,
            "Currency": "BGN",
            "CountryCode": "+359"
        },
        {
            "Key": 9454,
            "Name": "Haskovo",
            "FullName": "Haskovo, Bulgaria",
            "Lat": 41.93,
            "Long": 25.56,
            "CurrencyID": 24,
            "Currency": "BGN",
            "CountryCode": "+359"
        },
        {
            "Key": 9455,
            "Name": "Plovdiv",
            "FullName": "Plovdiv, Bulgaria",
            "Lat": 42.15,
            "Long": 24.75,
            "CurrencyID": 24,
            "Currency": "BGN",
            "CountryCode": "+359"
        },
        {
            "Key": 9456,
            "Name": "Sofia",
            "FullName": "Sofia, Bulgaria",
            "Lat": 42.7,
            "Long": 23.33,
            "CurrencyID": 24,
            "Currency": "BGN",
            "CountryCode": "+359"
        },
        {
            "Key": 9457,
            "Name": "Stara Zagora",
            "FullName": "Stara Zagora, Bulgaria",
            "Lat": 42.43,
            "Long": 25.65,
            "CurrencyID": 24,
            "Currency": "BGN",
            "CountryCode": "+359"
        },
        {
            "Key": 9343,
            "Name": "Manama",
            "FullName": "Manama, Bahrain",
            "Lat": 26.22,
            "Long": 50.58,
            "CurrencyID": 25,
            "Currency": "BHD",
            "CountryCode": "+973"
        },
        {
            "Key": 9361,
            "Name": "Hamilton",
            "FullName": "Hamilton, Bermuda",
            "Lat": 32.29,
            "Long": -64.78,
            "CurrencyID": 26,
            "Currency": "BMD",
            "CountryCode": "+1"
        },
        {
            "Key": 9452,
            "Name": "Bandar Seri Begawan",
            "FullName": "Bandar Seri Begawan, Brunei",
            "Lat": 4.89,
            "Long": 114.94,
            "CurrencyID": 27,
            "Currency": "BND",
            "CountryCode": "+673"
        },
        {
            "Key": 10628,
            "Name": "Serangoon",
            "FullName": "Serangoon, Singapore",
            "Lat": 1.35,
            "Long": 103.87,
            "CurrencyID": 27,
            "Currency": "BND",
            "CountryCode": "+65"
        },
        {
            "Key": 9362,
            "Name": "La Paz",
            "FullName": "La Paz, Bolivia",
            "Lat": -16.5,
            "Long": -68.15,
            "CurrencyID": 28,
            "Currency": "BOB",
            "CountryCode": "+591"
        },
        {
            "Key": 9363,
            "Name": "Santa Cruz De La Sierra",
            "FullName": "Santa Cruz De La Sierra, Bolivia",
            "Lat": -17.8,
            "Long": -63.18,
            "CurrencyID": 28,
            "Currency": "BOB",
            "CountryCode": "+591"
        },
        {
            "Key": 9366,
            "Name": "Nova Iguacu",
            "FullName": "Nova Iguacu, Brazil",
            "Lat": -22.76,
            "Long": -43.45,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9367,
            "Name": "Olinda",
            "FullName": "Olinda, Brazil",
            "Lat": -8,
            "Long": -34.88,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9368,
            "Name": "Osasco",
            "FullName": "Osasco, Brazil",
            "Lat": -23.53,
            "Long": -46.8,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9369,
            "Name": "Paulista",
            "FullName": "Paulista, Brazil",
            "Lat": -7.94,
            "Long": -34.87,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9370,
            "Name": "Pelotas",
            "FullName": "Pelotas, Brazil",
            "Lat": -31.77,
            "Long": -52.34,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9371,
            "Name": "Petrolina",
            "FullName": "Petrolina, Brazil",
            "Lat": -9.39,
            "Long": -40.51,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9372,
            "Name": "Piracicaba",
            "FullName": "Piracicaba, Brazil",
            "Lat": -22.73,
            "Long": -47.65,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9373,
            "Name": "Ponta Grossa",
            "FullName": "Ponta Grossa, Brazil",
            "Lat": -25.1,
            "Long": -50.16,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9374,
            "Name": "Porto Alegre",
            "FullName": "Porto Alegre, Brazil",
            "Lat": -30.03,
            "Long": -51.23,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9375,
            "Name": "Porto Velho",
            "FullName": "Porto Velho, Brazil",
            "Lat": -8.76,
            "Long": -63.9,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9376,
            "Name": "Recife",
            "FullName": "Recife, Brazil",
            "Lat": -8.05,
            "Long": -34.9,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9377,
            "Name": "Ribeirao Das Neves",
            "FullName": "Ribeirao Das Neves, Brazil",
            "Lat": -19.77,
            "Long": -44.09,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9378,
            "Name": "Ribeirao Preto",
            "FullName": "Ribeirao Preto, Brazil",
            "Lat": -21.18,
            "Long": -47.81,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9379,
            "Name": "Rio Branco",
            "FullName": "Rio Branco, Brazil",
            "Lat": -9.97,
            "Long": -67.81,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9380,
            "Name": "Rio De Janeiro",
            "FullName": "Rio De Janeiro, Brazil",
            "Lat": -22.91,
            "Long": -43.17,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9381,
            "Name": "Salvador",
            "FullName": "Salvador, Brazil",
            "Lat": -12.97,
            "Long": -38.48,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9382,
            "Name": "Santo Andre",
            "FullName": "Santo Andre, Brazil",
            "Lat": -23.67,
            "Long": -46.52,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9383,
            "Name": "Santos",
            "FullName": "Santos, Brazil",
            "Lat": -23.94,
            "Long": -46.33,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9384,
            "Name": "Sao Bernardo Do Campo",
            "FullName": "Sao Bernardo Do Campo, Brazil",
            "Lat": -23.7,
            "Long": -46.55,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9385,
            "Name": "Sao Goncalo",
            "FullName": "Sao Goncalo, Brazil",
            "Lat": -22.83,
            "Long": -43.05,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9386,
            "Name": "Sao Joao De Meriti",
            "FullName": "Sao Joao De Meriti, Brazil",
            "Lat": -22.8,
            "Long": -43.37,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9387,
            "Name": "Sao Jose Do Rio Preto",
            "FullName": "Sao Jose Do Rio Preto, Brazil",
            "Lat": -20.81,
            "Long": -49.38,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9388,
            "Name": "Sao Jose Dos Campos",
            "FullName": "Sao Jose Dos Campos, Brazil",
            "Lat": -23.19,
            "Long": -45.88,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9389,
            "Name": "Sao Luis",
            "FullName": "Sao Luis, Brazil",
            "Lat": -2.53,
            "Long": -44.3,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9390,
            "Name": "Sao Paulo",
            "FullName": "Sao Paulo, Brazil",
            "Lat": -23.55,
            "Long": -46.63,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9391,
            "Name": "Sao Vicente",
            "FullName": "Sao Vicente, Brazil",
            "Lat": -23.96,
            "Long": -46.39,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9392,
            "Name": "Serra",
            "FullName": "Serra, Brazil",
            "Lat": -20.13,
            "Long": -40.31,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9393,
            "Name": "Sorocaba",
            "FullName": "Sorocaba, Brazil",
            "Lat": -23.5,
            "Long": -47.46,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9394,
            "Name": "Teresina",
            "FullName": "Teresina, Brazil",
            "Lat": -5.09,
            "Long": -42.8,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9395,
            "Name": "Uberaba",
            "FullName": "Uberaba, Brazil",
            "Lat": -19.75,
            "Long": -47.93,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9396,
            "Name": "Uberlandia",
            "FullName": "Uberlandia, Brazil",
            "Lat": -18.92,
            "Long": -48.29,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9397,
            "Name": "Vila Velha",
            "FullName": "Vila Velha, Brazil",
            "Lat": -20.34,
            "Long": -40.29,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9398,
            "Name": "Vitoria",
            "FullName": "Vitoria, Brazil",
            "Lat": -20.32,
            "Long": -40.34,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9399,
            "Name": "Vitoria Da Conquista",
            "FullName": "Vitoria Da Conquista, Brazil",
            "Lat": -14.87,
            "Long": -40.84,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9400,
            "Name": "Ananindeua",
            "FullName": "Ananindeua, Brazil",
            "Lat": -1.37,
            "Long": -48.37,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9401,
            "Name": "Anapolis",
            "FullName": "Anapolis, Brazil",
            "Lat": -16.33,
            "Long": -48.95,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9402,
            "Name": "Aparecida De Goiania",
            "FullName": "Aparecida De Goiania, Brazil",
            "Lat": -16.82,
            "Long": -49.23,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9403,
            "Name": "Aracaju",
            "FullName": "Aracaju, Brazil",
            "Lat": -10.92,
            "Long": -37.05,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9404,
            "Name": "Bauru",
            "FullName": "Bauru, Brazil",
            "Lat": -22.31,
            "Long": -49.06,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9405,
            "Name": "Belem",
            "FullName": "Belem, Brazil",
            "Lat": -1.46,
            "Long": -48.5,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9406,
            "Name": "Belford Roxo",
            "FullName": "Belford Roxo, Brazil",
            "Lat": -22.76,
            "Long": -43.4,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9407,
            "Name": "Belo Horizonte",
            "FullName": "Belo Horizonte, Brazil",
            "Lat": -19.92,
            "Long": -43.93,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9408,
            "Name": "Betim",
            "FullName": "Betim, Brazil",
            "Lat": -19.97,
            "Long": -44.2,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9409,
            "Name": "Blumenau",
            "FullName": "Blumenau, Brazil",
            "Lat": -26.93,
            "Long": -49.05,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9410,
            "Name": "Boa Vista",
            "FullName": "Boa Vista, Brazil",
            "Lat": 2.82,
            "Long": -60.67,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9411,
            "Name": "Brasilia",
            "FullName": "Brasilia, Brazil",
            "Lat": -15.79,
            "Long": -47.88,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9412,
            "Name": "Campina Grande",
            "FullName": "Campina Grande, Brazil",
            "Lat": -7.23,
            "Long": -35.88,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9413,
            "Name": "Campinas",
            "FullName": "Campinas, Brazil",
            "Lat": -22.9,
            "Long": -47.06,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9414,
            "Name": "Campo Grande",
            "FullName": "Campo Grande, Brazil",
            "Lat": -20.46,
            "Long": -54.61,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9415,
            "Name": "Campos Dos Goytacazes",
            "FullName": "Campos Dos Goytacazes, Brazil",
            "Lat": -21.75,
            "Long": -41.32,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9416,
            "Name": "Canoas",
            "FullName": "Canoas, Brazil",
            "Lat": -29.92,
            "Long": -51.18,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9417,
            "Name": "Carapicuiba",
            "FullName": "Carapicuiba, Brazil",
            "Lat": -23.52,
            "Long": -46.84,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9418,
            "Name": "Cariacica",
            "FullName": "Cariacica, Brazil",
            "Lat": -20.33,
            "Long": -40.38,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9419,
            "Name": "Caruaru",
            "FullName": "Caruaru, Brazil",
            "Lat": -8.28,
            "Long": -35.98,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9420,
            "Name": "Cascavel",
            "FullName": "Cascavel, Brazil",
            "Lat": -8.28,
            "Long": -35.98,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9421,
            "Name": "Caucaia",
            "FullName": "Caucaia, Brazil",
            "Lat": -8.28,
            "Long": -35.98,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9422,
            "Name": "Caxias Do Sul",
            "FullName": "Caxias Do Sul, Brazil",
            "Lat": -29.17,
            "Long": -51.18,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9423,
            "Name": "Contagem",
            "FullName": "Contagem, Brazil",
            "Lat": -29.17,
            "Long": -51.18,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9424,
            "Name": "Cuiaba",
            "FullName": "Cuiaba, Brazil",
            "Lat": -15.6,
            "Long": -56.1,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9425,
            "Name": "Curitiba",
            "FullName": "Curitiba, Brazil",
            "Lat": -25.42,
            "Long": -49.25,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9426,
            "Name": "Diadema",
            "FullName": "Diadema, Brazil",
            "Lat": -23.69,
            "Long": -46.61,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9427,
            "Name": "Duque De Caxias",
            "FullName": "Duque De Caxias, Brazil",
            "Lat": -22.79,
            "Long": -43.31,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9428,
            "Name": "Feira De Santana",
            "FullName": "Feira De Santana, Brazil",
            "Lat": -12.25,
            "Long": -38.95,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9429,
            "Name": "Florianopolis",
            "FullName": "Florianopolis, Brazil",
            "Lat": -27.6,
            "Long": -48.55,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9430,
            "Name": "Fortaleza",
            "FullName": "Fortaleza, Brazil",
            "Lat": -3.72,
            "Long": -38.54,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9431,
            "Name": "Franca",
            "FullName": "Franca, Brazil",
            "Lat": -20.54,
            "Long": -47.4,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9432,
            "Name": "Goiania",
            "FullName": "Goiania, Brazil",
            "Lat": -16.67,
            "Long": -49.25,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9433,
            "Name": "Guaruja",
            "FullName": "Guaruja, Brazil",
            "Lat": -23.99,
            "Long": -46.26,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9434,
            "Name": "Guarulhos",
            "FullName": "Guarulhos, Brazil",
            "Lat": -23.47,
            "Long": -46.53,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9435,
            "Name": "Itaquaquecetuba",
            "FullName": "Itaquaquecetuba, Brazil",
            "Lat": -23.47,
            "Long": -46.53,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9436,
            "Name": "Jaboatao Dos Guararapes",
            "FullName": "Jaboatao Dos Guararapes, Brazil",
            "Lat": -8.11,
            "Long": -35.02,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9437,
            "Name": "Joao Pessoa",
            "FullName": "Joao Pessoa, Brazil",
            "Lat": -7.08,
            "Long": -34.83,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9438,
            "Name": "Joinville",
            "FullName": "Joinville, Brazil",
            "Lat": -26.32,
            "Long": -48.84,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9439,
            "Name": "Juiz De Fora",
            "FullName": "Juiz De Fora, Brazil",
            "Lat": -21.76,
            "Long": -43.35,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9440,
            "Name": "Jundiai",
            "FullName": "Jundiai, Brazil",
            "Lat": -23.19,
            "Long": -46.88,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9441,
            "Name": "Londrina",
            "FullName": "Londrina, Brazil",
            "Lat": -23.31,
            "Long": -51.16,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9442,
            "Name": "Macapa",
            "FullName": "Macapa, Brazil",
            "Lat": 0.03,
            "Long": -51.35,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9443,
            "Name": "Maceio",
            "FullName": "Maceio, Brazil",
            "Lat": -9.67,
            "Long": -35.73,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9444,
            "Name": "Manaus",
            "FullName": "Manaus, Brazil",
            "Lat": -3.1,
            "Long": -60.02,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9445,
            "Name": "Maringa",
            "FullName": "Maringa, Brazil",
            "Lat": -23.4,
            "Long": -51.92,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9446,
            "Name": "Maua",
            "FullName": "Maua, Brazil",
            "Lat": -23.67,
            "Long": -46.46,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9447,
            "Name": "Mogi Das Cruzes",
            "FullName": "Mogi Das Cruzes, Brazil",
            "Lat": -23.52,
            "Long": -46.19,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9448,
            "Name": "Montes Claros",
            "FullName": "Montes Claros, Brazil",
            "Lat": -16.73,
            "Long": -43.86,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9449,
            "Name": "Natal",
            "FullName": "Natal, Brazil",
            "Lat": -5.78,
            "Long": -35.2,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9450,
            "Name": "Niteroi",
            "FullName": "Niteroi, Brazil",
            "Lat": -22.88,
            "Long": -43.1,
            "CurrencyID": 29,
            "Currency": "BRL",
            "CountryCode": "+55"
        },
        {
            "Key": 9342,
            "Name": "Nassau",
            "FullName": "Nassau, Bahamas",
            "Lat": 25.06,
            "Long": -77.34,
            "CurrencyID": 30,
            "Currency": "BSD",
            "CountryCode": "+1"
        },
        {
            "Key": 9365,
            "Name": "Gaborone",
            "FullName": "Gaborone, Botswana",
            "Lat": -24.66,
            "Long": 25.91,
            "CurrencyID": 31,
            "Currency": "BWP",
            "CountryCode": "+267"
        },
        {
            "Key": 11520,
            "Name": "Harare",
            "FullName": "Harare, Zimbabwe",
            "Lat": -17.86,
            "Long": -31.03,
            "CurrencyID": 31,
            "Currency": "BWP",
            "CountryCode": "+263"
        },
        {
            "Key": 9346,
            "Name": "Minsk",
            "FullName": "Minsk, Belarus",
            "Lat": 53.9,
            "Long": 27.57,
            "CurrencyID": 32,
            "Currency": "BYR",
            "CountryCode": "+375"
        },
        {
            "Key": 9359,
            "Name": "Belmopan",
            "FullName": "Belmopan, Belize",
            "Lat": 17.25,
            "Long": -88.77,
            "CurrencyID": 33,
            "Currency": "BZD",
            "CountryCode": "+501"
        },
        {
            "Key": 9465,
            "Name": "Ajax",
            "FullName": "Ajax, Canada",
            "Lat": 43.86,
            "Long": -79.04,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9466,
            "Name": "Aurora,Ontario",
            "FullName": "Aurora,Ontario, Canada",
            "Lat": 44,
            "Long": -79.47,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9467,
            "Name": "Boucherville",
            "FullName": "Boucherville, Canada",
            "Lat": 45.6,
            "Long": -73.45,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9468,
            "Name": "Brampton",
            "FullName": "Brampton, Canada",
            "Lat": 43.68,
            "Long": -79.77,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9470,
            "Name": "Brossard",
            "FullName": "Brossard, Canada",
            "Lat": 45.47,
            "Long": -73.45,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9471,
            "Name": "Burlington",
            "FullName": "Burlington, Canada",
            "Lat": 43.33,
            "Long": -79.8,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9472,
            "Name": "Calgary",
            "FullName": "Calgary, Canada",
            "Lat": 51.05,
            "Long": -114.07,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9473,
            "Name": "Cambridge, Ontario",
            "FullName": "Cambridge, Ontario, Canada",
            "Lat": 43.36,
            "Long": -80.31,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9474,
            "Name": "Dorval",
            "FullName": "Dorval, Canada",
            "Lat": 45.45,
            "Long": -73.75,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9475,
            "Name": "Edmonton",
            "FullName": "Edmonton, Canada",
            "Lat": 53.53,
            "Long": -113.5,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9476,
            "Name": "Gatineau",
            "FullName": "Gatineau, Canada",
            "Lat": 45.48,
            "Long": -75.65,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9477,
            "Name": "Guelph",
            "FullName": "Guelph, Canada",
            "Lat": 43.55,
            "Long": -80.25,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9478,
            "Name": "Halifax",
            "FullName": "Halifax, Canada",
            "Lat": 44.65,
            "Long": -63.57,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9479,
            "Name": "Hamilton",
            "FullName": "Hamilton, Canada",
            "Lat": 43.25,
            "Long": -79.87,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9480,
            "Name": "Kincardine",
            "FullName": "Kincardine, Canada",
            "Lat": 44.17,
            "Long": -81.63,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9481,
            "Name": "Kingston",
            "FullName": "Kingston, Canada",
            "Lat": 44.23,
            "Long": -76.5,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9482,
            "Name": "Kitchener",
            "FullName": "Kitchener, Canada",
            "Lat": 43.45,
            "Long": -80.48,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9483,
            "Name": "Langford",
            "FullName": "Langford, Canada",
            "Lat": 48.45,
            "Long": -123.51,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9484,
            "Name": "Laval",
            "FullName": "Laval, Canada",
            "Lat": 45.58,
            "Long": -73.75,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9485,
            "Name": "London",
            "FullName": "London, Canada",
            "Lat": 42.98,
            "Long": -81.25,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9486,
            "Name": "Longueuil",
            "FullName": "Longueuil, Canada",
            "Lat": 45.53,
            "Long": -73.52,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9487,
            "Name": "Markham",
            "FullName": "Markham, Canada",
            "Lat": 43.88,
            "Long": -79.25,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9488,
            "Name": "Mississauga",
            "FullName": "Mississauga, Canada",
            "Lat": 43.6,
            "Long": -79.65,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9489,
            "Name": "Moncton",
            "FullName": "Moncton, Canada",
            "Lat": 46.13,
            "Long": -64.77,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9490,
            "Name": "Montreal",
            "FullName": "Montreal, Canada",
            "Lat": 45.5,
            "Long": -73.57,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9491,
            "Name": "Newmarket",
            "FullName": "Newmarket, Canada",
            "Lat": 44.06,
            "Long": -79.45,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9492,
            "Name": "North Bay",
            "FullName": "North Bay, Canada",
            "Lat": 46.3,
            "Long": -79.45,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9493,
            "Name": "Oakville",
            "FullName": "Oakville, Canada",
            "Lat": 43.45,
            "Long": -79.68,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9494,
            "Name": "Ottawa",
            "FullName": "Ottawa, Canada",
            "Lat": 45.42,
            "Long": -75.69,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9495,
            "Name": "Pickering",
            "FullName": "Pickering, Canada",
            "Lat": 43.84,
            "Long": -79.09,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9496,
            "Name": "Quebec City",
            "FullName": "Quebec City, Canada",
            "Lat": 46.82,
            "Long": -71.22,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9497,
            "Name": "Richmond Hill",
            "FullName": "Richmond Hill, Canada",
            "Lat": 43.88,
            "Long": -79.43,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9498,
            "Name": "Saint Eustache",
            "FullName": "Saint Eustache, Canada",
            "Lat": 45.57,
            "Long": -73.9,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9499,
            "Name": "Saskatoon",
            "FullName": "Saskatoon, Canada",
            "Lat": 52.13,
            "Long": -106.68,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9500,
            "Name": "Sherwood Park",
            "FullName": "Sherwood Park, Canada",
            "Lat": 53.52,
            "Long": -113.31,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9501,
            "Name": "The Annex",
            "FullName": "The Annex, Canada",
            "Lat": 43.67,
            "Long": -79.4,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9502,
            "Name": "Toronto",
            "FullName": "Toronto, Canada",
            "Lat": 43.7,
            "Long": -79.4,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9503,
            "Name": "Vancouver",
            "FullName": "Vancouver, Canada",
            "Lat": 49.28,
            "Long": -123.12,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9504,
            "Name": "Vaughan",
            "FullName": "Vaughan, Canada",
            "Lat": 43.83,
            "Long": -79.5,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9505,
            "Name": "Victoria",
            "FullName": "Victoria, Canada",
            "Lat": 48.42,
            "Long": -123.37,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9506,
            "Name": "Waterloo",
            "FullName": "Waterloo, Canada",
            "Lat": 43.47,
            "Long": -80.52,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9507,
            "Name": "Whitby",
            "FullName": "Whitby, Canada",
            "Lat": 43.9,
            "Long": -78.94,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9508,
            "Name": "Winnipeg",
            "FullName": "Winnipeg, Canada",
            "Lat": 49.9,
            "Long": -97.14,
            "CurrencyID": 34,
            "Currency": "CAD",
            "CountryCode": "+1"
        },
        {
            "Key": 9745,
            "Name": "Kinshasa",
            "FullName": "Kinshasa, Congo",
            "Lat": -4.33,
            "Long": 15.32,
            "CurrencyID": 35,
            "Currency": "CDF",
            "CountryCode": "+242"
        },
        {
            "Key": 9746,
            "Name": "Brazzaville",
            "FullName": "Brazzaville, Congo",
            "Lat": -4.27,
            "Long": 15.29,
            "CurrencyID": 35,
            "Currency": "CDF",
            "CountryCode": "+242"
        },
        {
            "Key": 9747,
            "Name": "Lubumbashi",
            "FullName": "Lubumbashi, Congo",
            "Lat": -11.67,
            "Long": -27.47,
            "CurrencyID": 35,
            "Currency": "CDF",
            "CountryCode": "+242"
        },
        {
            "Key": 9748,
            "Name": "Mbuji Mayi",
            "FullName": "Mbuji Mayi, Congo",
            "Lat": -6.15,
            "Long": 23.6,
            "CurrencyID": 35,
            "Currency": "CDF",
            "CountryCode": "+242"
        },
        {
            "Key": 10133,
            "Name": "Vaduz",
            "FullName": "Vaduz, Liechtenstein",
            "Lat": 47.14,
            "Long": 9.52,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+423"
        },
        {
            "Key": 10704,
            "Name": "Basel",
            "FullName": "Basel, Switzerland",
            "Lat": 47.57,
            "Long": 7.6,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10705,
            "Name": "Bern",
            "FullName": "Bern, Switzerland",
            "Lat": 46.95,
            "Long": 7.45,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10706,
            "Name": "Frauenfeld",
            "FullName": "Frauenfeld, Switzerland",
            "Lat": 47.55,
            "Long": 8.9,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10707,
            "Name": "Geneva",
            "FullName": "Geneva, Switzerland",
            "Lat": 46.2,
            "Long": 6.15,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10708,
            "Name": "Gland",
            "FullName": "Gland, Switzerland",
            "Lat": 46.42,
            "Long": 6.27,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10709,
            "Name": "Lausanne",
            "FullName": "Lausanne, Switzerland",
            "Lat": 46.52,
            "Long": 6.63,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10710,
            "Name": "Liestal",
            "FullName": "Liestal, Switzerland",
            "Lat": 47.47,
            "Long": 7.73,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10711,
            "Name": "Lucerne",
            "FullName": "Lucerne, Switzerland",
            "Lat": 47.05,
            "Long": 8.3,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10712,
            "Name": "Lugano",
            "FullName": "Lugano, Switzerland",
            "Lat": 46,
            "Long": 8.95,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10713,
            "Name": "Neuchatel",
            "FullName": "Neuchatel, Switzerland",
            "Lat": 47,
            "Long": 6.93,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10714,
            "Name": "Nyon",
            "FullName": "Nyon, Switzerland",
            "Lat": 46.38,
            "Long": 6.23,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10715,
            "Name": "St Gallen",
            "FullName": "St Gallen, Switzerland",
            "Lat": 47.42,
            "Long": 9.37,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10716,
            "Name": "Uster",
            "FullName": "Uster, Switzerland",
            "Lat": 47.35,
            "Long": 8.72,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10717,
            "Name": "Vevey",
            "FullName": "Vevey, Switzerland",
            "Lat": 46.47,
            "Long": 6.85,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10718,
            "Name": "Winterthur",
            "FullName": "Winterthur, Switzerland",
            "Lat": 47.5,
            "Long": 8.75,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 10719,
            "Name": "Zurich",
            "FullName": "Zurich, Switzerland",
            "Lat": 47.37,
            "Long": 8.55,
            "CurrencyID": 36,
            "Currency": "CHF",
            "CountryCode": "+41"
        },
        {
            "Key": 9513,
            "Name": "Coquimbo",
            "FullName": "Coquimbo, Chile",
            "Lat": -29.95,
            "Long": -71.34,
            "CurrencyID": 37,
            "Currency": "CLP",
            "CountryCode": "+56"
        },
        {
            "Key": 9514,
            "Name": "La Florida",
            "FullName": "La Florida, Chile",
            "Lat": -33.53,
            "Long": -70.58,
            "CurrencyID": 37,
            "Currency": "CLP",
            "CountryCode": "+56"
        },
        {
            "Key": 9515,
            "Name": "Puente Alto",
            "FullName": "Puente Alto, Chile",
            "Lat": -33.62,
            "Long": -70.57,
            "CurrencyID": 37,
            "Currency": "CLP",
            "CountryCode": "+56"
        },
        {
            "Key": 9516,
            "Name": "Santiago",
            "FullName": "Santiago, Chile",
            "Lat": -33.45,
            "Long": -70.67,
            "CurrencyID": 37,
            "Currency": "CLP",
            "CountryCode": "+56"
        },
        {
            "Key": 9517,
            "Name": "Valparaiso",
            "FullName": "Valparaiso, Chile",
            "Lat": -33.05,
            "Long": -71.62,
            "CurrencyID": 37,
            "Currency": "CLP",
            "CountryCode": "+56"
        },
        {
            "Key": 9518,
            "Name": "Vina Del Mar",
            "FullName": "Vina Del Mar, Chile",
            "Lat": -33,
            "Long": -71.52,
            "CurrencyID": 37,
            "Currency": "CLP",
            "CountryCode": "+56"
        },
        {
            "Key": 9519,
            "Name": "Aksu",
            "FullName": "Aksu, China",
            "Lat": 41.11,
            "Long": 80.27,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9520,
            "Name": "Altay",
            "FullName": "Altay, China",
            "Lat": 47,
            "Long": 88.37,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9521,
            "Name": "Anqing",
            "FullName": "Anqing, China",
            "Lat": 30.5,
            "Long": 117.03,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9522,
            "Name": "Anshan",
            "FullName": "Anshan, China",
            "Lat": 41.12,
            "Long": 122.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9523,
            "Name": "Anyang",
            "FullName": "Anyang, China",
            "Lat": 36.1,
            "Long": 114.33,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9524,
            "Name": "Baoding",
            "FullName": "Baoding, China",
            "Lat": 38.87,
            "Long": 115.47,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9525,
            "Name": "Baoji",
            "FullName": "Baoji, China",
            "Lat": 34.35,
            "Long": 107.38,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9526,
            "Name": "Baotou",
            "FullName": "Baotou, China",
            "Lat": 40.65,
            "Long": 109.83,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9527,
            "Name": "Bazhong",
            "FullName": "Bazhong, China",
            "Lat": 31.71,
            "Long": 106.81,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9528,
            "Name": "Beihai",
            "FullName": "Beihai, China",
            "Lat": 21.47,
            "Long": 109.1,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9529,
            "Name": "Beijing",
            "FullName": "Beijing, China",
            "Lat": 39.92,
            "Long": 116.38,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9530,
            "Name": "Bengbu",
            "FullName": "Bengbu, China",
            "Lat": 32.94,
            "Long": 117.36,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9531,
            "Name": "Benxi",
            "FullName": "Benxi, China",
            "Lat": 41.3,
            "Long": 123.77,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9532,
            "Name": "Binzhou",
            "FullName": "Binzhou, China",
            "Lat": 37.37,
            "Long": 118.02,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9533,
            "Name": "Bozhou",
            "FullName": "Bozhou, China",
            "Lat": 33.87,
            "Long": 115.75,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9534,
            "Name": "Cangzhou",
            "FullName": "Cangzhou, China",
            "Lat": 38.32,
            "Long": 116.87,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9535,
            "Name": "Changchun",
            "FullName": "Changchun, China",
            "Lat": 43.9,
            "Long": 125.2,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9536,
            "Name": "Changde",
            "FullName": "Changde, China",
            "Lat": 29.03,
            "Long": 111.68,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9537,
            "Name": "Changsha",
            "FullName": "Changsha, China",
            "Lat": 28.2,
            "Long": 112.97,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9538,
            "Name": "Changshu",
            "FullName": "Changshu, China",
            "Lat": 31.66,
            "Long": 120.82,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9539,
            "Name": "Changzhou",
            "FullName": "Changzhou, China",
            "Lat": 31.78,
            "Long": 119.97,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9540,
            "Name": "Chaozhou",
            "FullName": "Chaozhou, China",
            "Lat": 23.67,
            "Long": 116.63,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9541,
            "Name": "Chengdu",
            "FullName": "Chengdu, China",
            "Lat": 30.66,
            "Long": 104.06,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9542,
            "Name": "Chifeng",
            "FullName": "Chifeng, China",
            "Lat": 42.25,
            "Long": 118.88,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9543,
            "Name": "Chongqing",
            "FullName": "Chongqing, China",
            "Lat": 29.56,
            "Long": 106.57,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9544,
            "Name": "Chuzhou",
            "FullName": "Chuzhou, China",
            "Lat": 32.3,
            "Long": 118.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9545,
            "Name": "Cixi",
            "FullName": "Cixi, China",
            "Lat": 30.17,
            "Long": 121.27,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9546,
            "Name": "Dalian",
            "FullName": "Dalian, China",
            "Lat": 38.92,
            "Long": 121.64,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9547,
            "Name": "Dandong",
            "FullName": "Dandong, China",
            "Lat": 40.12,
            "Long": 124.38,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9548,
            "Name": "Danyang",
            "FullName": "Danyang, China",
            "Lat": 32,
            "Long": 119.59,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9549,
            "Name": "Daqing",
            "FullName": "Daqing, China",
            "Lat": 46.58,
            "Long": 125,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9550,
            "Name": "Datong",
            "FullName": "Datong, China",
            "Lat": 40.08,
            "Long": 113.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9551,
            "Name": "Dengzhou",
            "FullName": "Dengzhou, China",
            "Lat": 32.68,
            "Long": 112.08,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9552,
            "Name": "Dezhou",
            "FullName": "Dezhou, China",
            "Lat": 37.43,
            "Long": 16.27,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9553,
            "Name": "Dingzhou",
            "FullName": "Dingzhou, China",
            "Lat": 38.52,
            "Long": 114.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9554,
            "Name": "Dongguan",
            "FullName": "Dongguan, China",
            "Lat": 23.03,
            "Long": 113.72,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9555,
            "Name": "Dongying",
            "FullName": "Dongying, China",
            "Lat": 37.45,
            "Long": 118.47,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9556,
            "Name": "Ezhou",
            "FullName": "Ezhou, China",
            "Lat": 30.4,
            "Long": 114.83,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9557,
            "Name": "Feicheng",
            "FullName": "Feicheng, China",
            "Lat": 36.25,
            "Long": 116.77,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9558,
            "Name": "Foshan",
            "FullName": "Foshan, China",
            "Lat": 23.02,
            "Long": 113.12,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9559,
            "Name": "Fuqing",
            "FullName": "Fuqing, China",
            "Lat": 26.06,
            "Long": 119.31,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9560,
            "Name": "Fushun",
            "FullName": "Fushun, China",
            "Lat": 41.87,
            "Long": 123.9,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9561,
            "Name": "Fuxin",
            "FullName": "Fuxin, China",
            "Lat": 42.02,
            "Long": 121.65,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9562,
            "Name": "Fuyang",
            "FullName": "Fuyang, China",
            "Lat": 32.91,
            "Long": 115.83,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9563,
            "Name": "Fuzhou",
            "FullName": "Fuzhou, China",
            "Lat": 26.08,
            "Long": 119.31,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9564,
            "Name": "Ganzhou",
            "FullName": "Ganzhou, China",
            "Lat": 25.87,
            "Long": 114.93,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9565,
            "Name": "Guangzhou",
            "FullName": "Guangzhou, China",
            "Lat": 23.13,
            "Long": 113.27,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9566,
            "Name": "Guigang",
            "FullName": "Guigang, China",
            "Lat": 23.1,
            "Long": 109.61,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9567,
            "Name": "Guilin",
            "FullName": "Guilin, China",
            "Lat": 25.27,
            "Long": 110.28,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9568,
            "Name": "Guiyang",
            "FullName": "Guiyang, China",
            "Lat": 26.65,
            "Long": 106.63,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9569,
            "Name": "Haicheng",
            "FullName": "Haicheng, China",
            "Lat": 40.85,
            "Long": 122.75,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9570,
            "Name": "Haikou",
            "FullName": "Haikou, China",
            "Lat": 20.04,
            "Long": 110.34,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9571,
            "Name": "Haimen",
            "FullName": "Haimen, China",
            "Lat": 31.87,
            "Long": 121.18,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9572,
            "Name": "Handan",
            "FullName": "Handan, China",
            "Lat": 36.6,
            "Long": 114.48,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9573,
            "Name": "Hangzhou",
            "FullName": "Hangzhou, China",
            "Lat": 30.25,
            "Long": 120.17,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9574,
            "Name": "Harbin",
            "FullName": "Harbin, China",
            "Lat": 45.75,
            "Long": 126.63,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9575,
            "Name": "Hefei",
            "FullName": "Hefei, China",
            "Lat": 31.87,
            "Long": 117.28,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9576,
            "Name": "Hegang",
            "FullName": "Hegang, China",
            "Lat": 47.35,
            "Long": 130.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9577,
            "Name": "Hengyang",
            "FullName": "Hengyang, China",
            "Lat": 26.9,
            "Long": 112.6,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9578,
            "Name": "Heze",
            "FullName": "Heze, China",
            "Lat": 35.23,
            "Long": 115.43,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9579,
            "Name": "Hezhou",
            "FullName": "Hezhou, China",
            "Lat": 24.42,
            "Long": 111.55,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9580,
            "Name": "Hohhot",
            "FullName": "Hohhot, China",
            "Lat": 40.82,
            "Long": 111.65,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9581,
            "Name": "Huaian",
            "FullName": "Huaian, China",
            "Lat": 33.5,
            "Long": 119.13,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9582,
            "Name": "Huaibei",
            "FullName": "Huaibei, China",
            "Lat": 33.58,
            "Long": 116.47,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9583,
            "Name": "Huainan",
            "FullName": "Huainan, China",
            "Lat": 32.62,
            "Long": 116.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9584,
            "Name": "Huangshi",
            "FullName": "Huangshi, China",
            "Lat": 30.22,
            "Long": 115.08,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9585,
            "Name": "Huazhou",
            "FullName": "Huazhou, China",
            "Lat": 21.63,
            "Long": 110.58,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9586,
            "Name": "Huizhou",
            "FullName": "Huizhou, China",
            "Lat": 23.11,
            "Long": 114.42,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9587,
            "Name": "Huludao",
            "FullName": "Huludao, China",
            "Lat": 40.72,
            "Long": 120.83,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9588,
            "Name": "Jiamusi",
            "FullName": "Jiamusi, China",
            "Lat": 46.8,
            "Long": 130.32,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9589,
            "Name": "Jiangmen",
            "FullName": "Jiangmen, China",
            "Lat": 22.57,
            "Long": 113.07,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9590,
            "Name": "Jiangyin",
            "FullName": "Jiangyin, China",
            "Lat": 31.84,
            "Long": 120.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9591,
            "Name": "Jiaozuo",
            "FullName": "Jiaozuo, China",
            "Lat": 35.24,
            "Long": 113.22,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9592,
            "Name": "Jiaxing",
            "FullName": "Jiaxing, China",
            "Lat": 30.77,
            "Long": 120.75,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9593,
            "Name": "Jilin City",
            "FullName": "Jilin City, China",
            "Lat": 43.87,
            "Long": 126.55,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9594,
            "Name": "Jinan",
            "FullName": "Jinan, China",
            "Lat": 36.67,
            "Long": 116.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9595,
            "Name": "Jingjiang",
            "FullName": "Jingjiang, China",
            "Lat": 24.82,
            "Long": 118.57,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9596,
            "Name": "Jingzhou",
            "FullName": "Jingzhou, China",
            "Lat": 30.33,
            "Long": 112.22,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9597,
            "Name": "Jinhua",
            "FullName": "Jinhua, China",
            "Lat": 29.08,
            "Long": 119.65,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9598,
            "Name": "Jining",
            "FullName": "Jining, China",
            "Lat": 35.4,
            "Long": 116.57,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9599,
            "Name": "Jinzhou",
            "FullName": "Jinzhou, China",
            "Lat": 41.12,
            "Long": 121.13,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9600,
            "Name": "Jiujiang",
            "FullName": "Jiujiang, China",
            "Lat": 29.74,
            "Long": 115.99,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9601,
            "Name": "Kaifeng",
            "FullName": "Kaifeng, China",
            "Lat": 34.8,
            "Long": 114.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9602,
            "Name": "Karamay",
            "FullName": "Karamay, China",
            "Lat": 45.6,
            "Long": 84.88,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9603,
            "Name": "Kashgar",
            "FullName": "Kashgar, China",
            "Lat": 39.47,
            "Long": 75.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9604,
            "Name": "Kunming",
            "FullName": "Kunming, China",
            "Lat": 25.07,
            "Long": 102.68,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9605,
            "Name": "Laiwu",
            "FullName": "Laiwu, China",
            "Lat": 36.18,
            "Long": 117.67,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9606,
            "Name": "Langfang",
            "FullName": "Langfang, China",
            "Lat": 39.52,
            "Long": 116.7,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9607,
            "Name": "Lanzhou",
            "FullName": "Lanzhou, China",
            "Lat": 36.03,
            "Long": 103.8,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9608,
            "Name": "Lhasa",
            "FullName": "Lhasa, China",
            "Lat": 29.65,
            "Long": 91.12,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9609,
            "Name": "Lianyungang",
            "FullName": "Lianyungang, China",
            "Lat": 34.6,
            "Long": 119.17,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9610,
            "Name": "Liaocheng",
            "FullName": "Liaocheng, China",
            "Lat": 36.45,
            "Long": 115.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9611,
            "Name": "Liaoyang",
            "FullName": "Liaoyang, China",
            "Lat": 41.27,
            "Long": 123.17,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9612,
            "Name": "Lijiang",
            "FullName": "Lijiang, China",
            "Lat": 26.86,
            "Long": 100.23,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9613,
            "Name": "Linfen",
            "FullName": "Linfen, China",
            "Lat": 36.08,
            "Long": 111.52,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9614,
            "Name": "Linhai",
            "FullName": "Linhai, China",
            "Lat": 28.85,
            "Long": 121.12,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9615,
            "Name": "Linyi",
            "FullName": "Linyi, China",
            "Lat": 35.05,
            "Long": 118.35,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9616,
            "Name": "Lishui",
            "FullName": "Lishui, China",
            "Lat": 28.45,
            "Long": 119.92,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9617,
            "Name": "Liuzhou",
            "FullName": "Liuzhou, China",
            "Lat": 24.32,
            "Long": 109.38,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9618,
            "Name": "Luan",
            "FullName": "Luan, China",
            "Lat": 31.75,
            "Long": 116.51,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9619,
            "Name": "Luoyang",
            "FullName": "Luoyang, China",
            "Lat": 34.67,
            "Long": 112.44,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9620,
            "Name": "Maanshan",
            "FullName": "Maanshan, China",
            "Lat": 31.7,
            "Long": 118.35,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9621,
            "Name": "Maoming",
            "FullName": "Maoming, China",
            "Lat": 21.65,
            "Long": 110.92,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9622,
            "Name": "Mianyang",
            "FullName": "Mianyang, China",
            "Lat": 31.47,
            "Long": 104.68,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9623,
            "Name": "Mudanjiang",
            "FullName": "Mudanjiang, China",
            "Lat": 44.55,
            "Long": 129.63,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9624,
            "Name": "Nanchang",
            "FullName": "Nanchang, China",
            "Lat": 28.68,
            "Long": 115.88,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9625,
            "Name": "Nanchong",
            "FullName": "Nanchong, China",
            "Lat": 30.8,
            "Long": 106.08,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9626,
            "Name": "Nanjing",
            "FullName": "Nanjing, China",
            "Lat": 32.05,
            "Long": 118.77,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9627,
            "Name": "Nanning",
            "FullName": "Nanning, China",
            "Lat": 22.82,
            "Long": 108.32,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9628,
            "Name": "Nanping",
            "FullName": "Nanping, China",
            "Lat": 26.27,
            "Long": 114.42,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9629,
            "Name": "Nantong",
            "FullName": "Nantong, China",
            "Lat": 31.98,
            "Long": 120.9,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9630,
            "Name": "Nanyang",
            "FullName": "Nanyang, China",
            "Lat": 33,
            "Long": 112.53,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9631,
            "Name": "Neijiang",
            "FullName": "Neijiang, China",
            "Lat": 29.58,
            "Long": 105.07,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9632,
            "Name": "Ningbo",
            "FullName": "Ningbo, China",
            "Lat": 29.87,
            "Long": 121.55,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9633,
            "Name": "Panjin",
            "FullName": "Panjin, China",
            "Lat": 41.12,
            "Long": 122.05,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9634,
            "Name": "Panzhihua",
            "FullName": "Panzhihua, China",
            "Lat": 26.58,
            "Long": 101.72,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9635,
            "Name": "Pingdingshan",
            "FullName": "Pingdingshan, China",
            "Lat": 33.73,
            "Long": 113.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9636,
            "Name": "Pizhou",
            "FullName": "Pizhou, China",
            "Lat": 34.4,
            "Long": 117.89,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9637,
            "Name": "Provincial Capital",
            "FullName": "Provincial Capital, China",
            "Lat": 39.92,
            "Long": 116.38,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9638,
            "Name": "Putian",
            "FullName": "Putian, China",
            "Lat": 25.43,
            "Long": 119.02,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9639,
            "Name": "Puyang",
            "FullName": "Puyang, China",
            "Lat": 38.83,
            "Long": 115.13,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9640,
            "Name": "Qidong",
            "FullName": "Qidong, China",
            "Lat": 31.87,
            "Long": 121.7,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9641,
            "Name": "Qingdao",
            "FullName": "Qingdao, China",
            "Lat": 36.07,
            "Long": 120.38,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9642,
            "Name": "Qinhuangdao",
            "FullName": "Qinhuangdao, China",
            "Lat": 39.93,
            "Long": 119.6,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9643,
            "Name": "Qiqihar",
            "FullName": "Qiqihar, China",
            "Lat": 47.35,
            "Long": 123.92,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9644,
            "Name": "Quanzhou",
            "FullName": "Quanzhou, China",
            "Lat": 24.92,
            "Long": 118.58,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9645,
            "Name": "Qujing",
            "FullName": "Qujing, China",
            "Lat": 25.48,
            "Long": 103.78,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9646,
            "Name": "Rizhao",
            "FullName": "Rizhao, China",
            "Lat": 35.42,
            "Long": 119.53,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9647,
            "Name": "Rugao",
            "FullName": "Rugao, China",
            "Lat": 32.25,
            "Long": 120.59,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9648,
            "Name": "Shanghai",
            "FullName": "Shanghai, China",
            "Lat": 31.2,
            "Long": 121.5,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9649,
            "Name": "Shantou",
            "FullName": "Shantou, China",
            "Lat": 23.35,
            "Long": 116.67,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9650,
            "Name": "Shaoxing",
            "FullName": "Shaoxing, China",
            "Lat": 30,
            "Long": 120.58,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9651,
            "Name": "Shaoyang",
            "FullName": "Shaoyang, China",
            "Lat": 27.24,
            "Long": 111.47,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9652,
            "Name": "Shenyang",
            "FullName": "Shenyang, China",
            "Lat": 41.8,
            "Long": 123.4,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9653,
            "Name": "Shenzhen",
            "FullName": "Shenzhen, China",
            "Lat": 22.55,
            "Long": 114.1,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9654,
            "Name": "Shijiazhuang",
            "FullName": "Shijiazhuang, China",
            "Lat": 38.04,
            "Long": 114.5,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9655,
            "Name": "Shouguang",
            "FullName": "Shouguang, China",
            "Lat": 36.88,
            "Long": 118.73,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9656,
            "Name": "Suihua",
            "FullName": "Suihua, China",
            "Lat": 46.63,
            "Long": 126.98,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9657,
            "Name": "Suqian",
            "FullName": "Suqian, China",
            "Lat": 33.93,
            "Long": 118.28,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9658,
            "Name": "Suzhou",
            "FullName": "Suzhou, China",
            "Lat": 31.3,
            "Long": 120.6,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9659,
            "Name": "Taian",
            "FullName": "Taian, China",
            "Lat": 36.2,
            "Long": 117.09,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9660,
            "Name": "Taixing",
            "FullName": "Taixing, China",
            "Lat": 32.16,
            "Long": 120.03,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9661,
            "Name": "Taiyuan",
            "FullName": "Taiyuan, China",
            "Lat": 37.87,
            "Long": 112.55,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9662,
            "Name": "Taizhou",
            "FullName": "Taizhou, China",
            "Lat": 28.67,
            "Long": 121.35,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9663,
            "Name": "Tangshan",
            "FullName": "Tangshan, China",
            "Lat": 39.6,
            "Long": 118.18,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9664,
            "Name": "Tengzhou",
            "FullName": "Tengzhou, China",
            "Lat": 35.11,
            "Long": 117.17,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9665,
            "Name": "Tianjin",
            "FullName": "Tianjin, China",
            "Lat": 39.13,
            "Long": 117.18,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9666,
            "Name": "Tianshui",
            "FullName": "Tianshui, China",
            "Lat": 34.57,
            "Long": 105.9,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9667,
            "Name": "Tieling",
            "FullName": "Tieling, China",
            "Lat": 42.3,
            "Long": 123.85,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9668,
            "Name": "Urumqi",
            "FullName": "Urumqi, China",
            "Lat": 43.83,
            "Long": 87.6,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9669,
            "Name": "Weifang",
            "FullName": "Weifang, China",
            "Lat": 36.72,
            "Long": 119.1,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9670,
            "Name": "Weihai",
            "FullName": "Weihai, China",
            "Lat": 37.52,
            "Long": 122.12,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9671,
            "Name": "Wenling",
            "FullName": "Wenling, China",
            "Lat": 28.37,
            "Long": 121.37,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9672,
            "Name": "Wenzhou",
            "FullName": "Wenzhou, China",
            "Lat": 28,
            "Long": 120.7,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9673,
            "Name": "Wuchuan",
            "FullName": "Wuchuan, China",
            "Lat": 21.46,
            "Long": 110.77,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9674,
            "Name": "Wuhan",
            "FullName": "Wuhan, China",
            "Lat": 30.58,
            "Long": 114.28,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9675,
            "Name": "Wuhu",
            "FullName": "Wuhu, China",
            "Lat": 31.37,
            "Long": 118.35,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9676,
            "Name": "Wuwei",
            "FullName": "Wuwei, China",
            "Lat": 37.93,
            "Long": 102.64,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9677,
            "Name": "Wuxi",
            "FullName": "Wuxi, China",
            "Lat": 31.57,
            "Long": 120.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9678,
            "Name": "Xi An",
            "FullName": "Xi An, China",
            "Lat": 34.27,
            "Long": 108.9,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9679,
            "Name": "Xiamen",
            "FullName": "Xiamen, China",
            "Lat": 24.48,
            "Long": 118.09,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9680,
            "Name": "Xiangcheng",
            "FullName": "Xiangcheng, China",
            "Lat": 24.51,
            "Long": 117.66,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9681,
            "Name": "Xiangtan",
            "FullName": "Xiangtan, China",
            "Lat": 27.83,
            "Long": 112.94,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9682,
            "Name": "Xiangyang",
            "FullName": "Xiangyang, China",
            "Lat": 32.02,
            "Long": 112.13,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9683,
            "Name": "Xianyang",
            "FullName": "Xianyang, China",
            "Lat": 34.35,
            "Long": 108.72,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9684,
            "Name": "Xingtai",
            "FullName": "Xingtai, China",
            "Lat": 37.06,
            "Long": 114.49,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9685,
            "Name": "Xining",
            "FullName": "Xining, China",
            "Lat": 36.63,
            "Long": 101.77,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9686,
            "Name": "Xinxiang",
            "FullName": "Xinxiang, China",
            "Lat": 35.3,
            "Long": 113.87,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9687,
            "Name": "Xinyang",
            "FullName": "Xinyang, China",
            "Lat": 32.13,
            "Long": 114.05,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9688,
            "Name": "Xinyi",
            "FullName": "Xinyi, China",
            "Lat": 35.65,
            "Long": 116.67,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9689,
            "Name": "Xuchang",
            "FullName": "Xuchang, China",
            "Lat": 34.03,
            "Long": 113.85,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9690,
            "Name": "Xuzhou",
            "FullName": "Xuzhou, China",
            "Lat": 34.26,
            "Long": 117.21,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9691,
            "Name": "Yancheng",
            "FullName": "Yancheng, China",
            "Lat": 33.38,
            "Long": 120.12,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9692,
            "Name": "Yangjiang",
            "FullName": "Yangjiang, China",
            "Lat": 21.85,
            "Long": 111.97,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9693,
            "Name": "Yangzhou",
            "FullName": "Yangzhou, China",
            "Lat": 32.4,
            "Long": 119.42,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9694,
            "Name": "Yantai",
            "FullName": "Yantai, China",
            "Lat": 37.53,
            "Long": 121.39,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9695,
            "Name": "Yibin",
            "FullName": "Yibin, China",
            "Lat": 28.77,
            "Long": 104.62,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9696,
            "Name": "Yichang",
            "FullName": "Yichang, China",
            "Lat": 30.72,
            "Long": 111.28,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9697,
            "Name": "Yinchuan",
            "FullName": "Yinchuan, China",
            "Lat": 38.47,
            "Long": 106.27,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9698,
            "Name": "Yingkou",
            "FullName": "Yingkou, China",
            "Lat": 40.64,
            "Long": 122.25,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9699,
            "Name": "Yiwu",
            "FullName": "Yiwu, China",
            "Lat": 29.2,
            "Long": 120.5,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9700,
            "Name": "Yixing",
            "FullName": "Yixing, China",
            "Lat": 31.03,
            "Long": 119.3,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9701,
            "Name": "Yueyang",
            "FullName": "Yueyang, China",
            "Lat": 29.37,
            "Long": 113.1,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9702,
            "Name": "Yulin",
            "FullName": "Yulin, China",
            "Lat": 42.49,
            "Long": 128.39,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9703,
            "Name": "Yuzhou",
            "FullName": "Yuzhou, China",
            "Lat": 34.16,
            "Long": 113.46,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9704,
            "Name": "Zaoyang",
            "FullName": "Zaoyang, China",
            "Lat": 32.13,
            "Long": 112.75,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9705,
            "Name": "Zaozhuang",
            "FullName": "Zaozhuang, China",
            "Lat": 34.87,
            "Long": 117.55,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9706,
            "Name": "Zhangjiagang",
            "FullName": "Zhangjiagang, China",
            "Lat": 31.88,
            "Long": 120.63,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9707,
            "Name": "Zhangqiu",
            "FullName": "Zhangqiu, China",
            "Lat": 36.69,
            "Long": 117.52,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9708,
            "Name": "Zhangzhou",
            "FullName": "Zhangzhou, China",
            "Lat": 24.52,
            "Long": 117.65,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9709,
            "Name": "Zhanjiang",
            "FullName": "Zhanjiang, China",
            "Lat": 21.2,
            "Long": 110.4,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9710,
            "Name": "Zhaoqing",
            "FullName": "Zhaoqing, China",
            "Lat": 23.05,
            "Long": 112.47,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9711,
            "Name": "Zhengzhou",
            "FullName": "Zhengzhou, China",
            "Lat": 34.77,
            "Long": 113.65,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9712,
            "Name": "Zhenjiang",
            "FullName": "Zhenjiang, China",
            "Lat": 32.2,
            "Long": 119.42,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9713,
            "Name": "Zhoukou",
            "FullName": "Zhoukou, China",
            "Lat": 33.63,
            "Long": 114.63,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9714,
            "Name": "Zhoushan",
            "FullName": "Zhoushan, China",
            "Lat": 30.17,
            "Long": 122.4,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9715,
            "Name": "Zhucheng",
            "FullName": "Zhucheng, China",
            "Lat": 36,
            "Long": 119.42,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9716,
            "Name": "Zhuhai",
            "FullName": "Zhuhai, China",
            "Lat": 22.28,
            "Long": 113.57,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9717,
            "Name": "Zhuji",
            "FullName": "Zhuji, China",
            "Lat": 29.72,
            "Long": 120.23,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9718,
            "Name": "Zhuzhou",
            "FullName": "Zhuzhou, China",
            "Lat": 27.85,
            "Long": 113.13,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9719,
            "Name": "Zibo",
            "FullName": "Zibo, China",
            "Lat": 36.78,
            "Long": 118.05,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9720,
            "Name": "Zigong",
            "FullName": "Zigong, China",
            "Lat": 29.4,
            "Long": 104.78,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9721,
            "Name": "Zoucheng",
            "FullName": "Zoucheng, China",
            "Lat": 35.4,
            "Long": 116.97,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9722,
            "Name": "Zunyi",
            "FullName": "Zunyi, China",
            "Lat": 27.68,
            "Long": 106.9,
            "CurrencyID": 38,
            "Currency": "CNY",
            "CountryCode": "+86"
        },
        {
            "Key": 9723,
            "Name": "Barranquilla",
            "FullName": "Barranquilla, Colombia",
            "Lat": 10.96,
            "Long": -74.8,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9725,
            "Name": "Bello",
            "FullName": "Bello, Colombia",
            "Lat": 6.33,
            "Long": -75.57,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9726,
            "Name": "Bogota",
            "FullName": "Bogota, Colombia",
            "Lat": 4.6,
            "Long": -74.08,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9727,
            "Name": "Bucaramanga",
            "FullName": "Bucaramanga, Colombia",
            "Lat": 7.13,
            "Long": -73,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9728,
            "Name": "Buenaventura",
            "FullName": "Buenaventura, Colombia",
            "Lat": 3.88,
            "Long": -77.03,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9729,
            "Name": "Cali",
            "FullName": "Cali, Colombia",
            "Lat": 3.45,
            "Long": -76.54,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9730,
            "Name": "Cartagena",
            "FullName": "Cartagena, Colombia",
            "Lat": 10.4,
            "Long": -75.5,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9731,
            "Name": "Cucuta",
            "FullName": "Cucuta, Colombia",
            "Lat": 7.89,
            "Long": -72.5,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9732,
            "Name": "Ibague",
            "FullName": "Ibague, Colombia",
            "Lat": 4.43,
            "Long": -75.23,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9733,
            "Name": "Manizales",
            "FullName": "Manizales, Colombia",
            "Lat": 5.1,
            "Long": -75.55,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9734,
            "Name": "Medellin",
            "FullName": "Medellin, Colombia",
            "Lat": 6.23,
            "Long": -75.59,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9736,
            "Name": "Monteria",
            "FullName": "Monteria, Colombia",
            "Lat": 8.75,
            "Long": -75.88,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9737,
            "Name": "Neiva",
            "FullName": "Neiva, Colombia",
            "Lat": 3,
            "Long": -75.3,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9738,
            "Name": "Pereira",
            "FullName": "Pereira, Colombia",
            "Lat": 4.81,
            "Long": -75.69,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9739,
            "Name": "San Juan De Pasto",
            "FullName": "San Juan De Pasto, Colombia",
            "Lat": 1.21,
            "Long": -77.28,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9740,
            "Name": "Santa Marta",
            "FullName": "Santa Marta, Colombia",
            "Lat": 11.24,
            "Long": -74.21,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9741,
            "Name": "Soacha",
            "FullName": "Soacha, Colombia",
            "Lat": 4.58,
            "Long": -74.22,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9742,
            "Name": "Soledad",
            "FullName": "Soledad, Colombia",
            "Lat": 10.92,
            "Long": -74.76,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9743,
            "Name": "Valledupar",
            "FullName": "Valledupar, Colombia",
            "Lat": 10.48,
            "Long": -73.25,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9744,
            "Name": "Villavicencio",
            "FullName": "Villavicencio, Colombia",
            "Lat": 4.15,
            "Long": -73.63,
            "CurrencyID": 39,
            "Currency": "COP",
            "CountryCode": "+57"
        },
        {
            "Key": 9749,
            "Name": "San Jose",
            "FullName": "San Jose, Costa Rica",
            "Lat": 9.6,
            "Long": -83.95,
            "CurrencyID": 40,
            "Currency": "CRC",
            "CountryCode": "+506"
        },
        {
            "Key": 9756,
            "Name": "Havana",
            "FullName": "Havana, Cuba",
            "Lat": 23.13,
            "Long": -82.38,
            "CurrencyID": 41,
            "Currency": "CUC",
            "CountryCode": "+53"
        },
        {
            "Key": 9509,
            "Name": "Praia",
            "FullName": "Praia, Cape Verde",
            "Lat": 14.92,
            "Long": -23.51,
            "CurrencyID": 42,
            "Currency": "CVE",
            "CountryCode": "+238"
        },
        {
            "Key": 9760,
            "Name": "Brno",
            "FullName": "Brno, Czech Republic",
            "Lat": 49.2,
            "Long": 16.62,
            "CurrencyID": 43,
            "Currency": "CZK",
            "CountryCode": "+420"
        },
        {
            "Key": 9761,
            "Name": "Cheb",
            "FullName": "Cheb, Czech Republic",
            "Lat": 50.08,
            "Long": 12.37,
            "CurrencyID": 43,
            "Currency": "CZK",
            "CountryCode": "+420"
        },
        {
            "Key": 9762,
            "Name": "Mlada Boleslav",
            "FullName": "Mlada Boleslav, Czech Republic",
            "Lat": 50.41,
            "Long": 14.9,
            "CurrencyID": 43,
            "Currency": "CZK",
            "CountryCode": "+420"
        },
        {
            "Key": 9763,
            "Name": "Ostrava",
            "FullName": "Ostrava, Czech Republic",
            "Lat": 49.84,
            "Long": 18.29,
            "CurrencyID": 43,
            "Currency": "CZK",
            "CountryCode": "+420"
        },
        {
            "Key": 9764,
            "Name": "Prague",
            "FullName": "Prague, Czech Republic",
            "Lat": 50.08,
            "Long": 14.42,
            "CurrencyID": 43,
            "Currency": "CZK",
            "CountryCode": "+420"
        },
        {
            "Key": 9765,
            "Name": "Teplice",
            "FullName": "Teplice, Czech Republic",
            "Lat": 50.63,
            "Long": 13.82,
            "CurrencyID": 43,
            "Currency": "CZK",
            "CountryCode": "+420"
        },
        {
            "Key": 9766,
            "Name": "Aalborg",
            "FullName": "Aalborg, Denmark",
            "Lat": 57.05,
            "Long": 9.92,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9767,
            "Name": "Aarhus",
            "FullName": "Aarhus, Denmark",
            "Lat": 56.16,
            "Long": 10.21,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9768,
            "Name": "Copenhagen",
            "FullName": "Copenhagen, Denmark",
            "Lat": 55.68,
            "Long": 12.57,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9769,
            "Name": "Esbjerg",
            "FullName": "Esbjerg, Denmark",
            "Lat": 55.48,
            "Long": 8.45,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9770,
            "Name": "Hillerod",
            "FullName": "Hillerod, Denmark",
            "Lat": 55.93,
            "Long": 12.32,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9771,
            "Name": "Odense",
            "FullName": "Odense, Denmark",
            "Lat": 55.4,
            "Long": 10.39,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9772,
            "Name": "Vejle",
            "FullName": "Vejle, Denmark",
            "Lat": 55.72,
            "Long": 9.53,
            "CurrencyID": 44,
            "Currency": "DKK",
            "CountryCode": "+45"
        },
        {
            "Key": 9773,
            "Name": "Higuey",
            "FullName": "Higuey, Dominican Republic",
            "Lat": 18.62,
            "Long": -68.7,
            "CurrencyID": 45,
            "Currency": "DOP",
            "CountryCode": "+1"
        },
        {
            "Key": 9774,
            "Name": "Santo Domingo",
            "FullName": "Santo Domingo, Dominican Republic",
            "Lat": 18.47,
            "Long": -69.95,
            "CurrencyID": 45,
            "Currency": "DOP",
            "CountryCode": "+1"
        },
        {
            "Key": 9179,
            "Name": "Algiers",
            "FullName": "Algiers, Algeria",
            "Lat": 36.77,
            "Long": 3.22,
            "CurrencyID": 46,
            "Currency": "DZD",
            "CountryCode": "+213"
        },
        {
            "Key": 9180,
            "Name": "Constantine",
            "FullName": "Constantine, Algeria",
            "Lat": 36.35,
            "Long": 6.6,
            "CurrencyID": 46,
            "Currency": "DZD",
            "CountryCode": "+213"
        },
        {
            "Key": 9181,
            "Name": "Djelfa",
            "FullName": "Djelfa, Algeria",
            "Lat": 34.67,
            "Long": 3.25,
            "CurrencyID": 46,
            "Currency": "DZD",
            "CountryCode": "+213"
        },
        {
            "Key": 9182,
            "Name": "Oran",
            "FullName": "Oran, Algeria",
            "Lat": 35.7,
            "Long": -0.63,
            "CurrencyID": 46,
            "Currency": "DZD",
            "CountryCode": "+213"
        },
        {
            "Key": 9183,
            "Name": "Skikda",
            "FullName": "Skikda, Algeria",
            "Lat": 36.87,
            "Long": 6.9,
            "CurrencyID": 46,
            "Currency": "DZD",
            "CountryCode": "+213"
        },
        {
            "Key": 9780,
            "Name": "Alexandria",
            "FullName": "Alexandria, Egypt",
            "Lat": 31.2,
            "Long": 29.92,
            "CurrencyID": 47,
            "Currency": "EGP",
            "CountryCode": "+20"
        },
        {
            "Key": 9781,
            "Name": "Cairo",
            "FullName": "Cairo, Egypt",
            "Lat": 30.05,
            "Long": 31.23,
            "CurrencyID": 47,
            "Currency": "EGP",
            "CountryCode": "+20"
        },
        {
            "Key": 9782,
            "Name": "Kharga",
            "FullName": "Kharga, Egypt",
            "Lat": 25.44,
            "Long": 30.56,
            "CurrencyID": 47,
            "Currency": "EGP",
            "CountryCode": "+20"
        },
        {
            "Key": 9783,
            "Name": "Suez",
            "FullName": "Suez, Egypt",
            "Lat": 29.97,
            "Long": 32.55,
            "CurrencyID": 47,
            "Currency": "EGP",
            "CountryCode": "+20"
        },
        {
            "Key": 9788,
            "Name": "Asmara",
            "FullName": "Asmara, Eritrea",
            "Lat": 15.33,
            "Long": 38.93,
            "CurrencyID": 48,
            "Currency": "ERN",
            "CountryCode": "+291"
        },
        {
            "Key": 9791,
            "Name": "Addis Ababa",
            "FullName": "Addis Ababa, Ethiopia",
            "Lat": 9.03,
            "Long": 38.74,
            "CurrencyID": 49,
            "Currency": "ETB",
            "CountryCode": "+251"
        },
        {
            "Key": 9792,
            "Name": "Helsinki",
            "FullName": "Helsinki, Finland",
            "Lat": 60.17,
            "Long": 24.94,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+358"
        },
        {
            "Key": 9793,
            "Name": "Kajaani",
            "FullName": "Kajaani, Finland",
            "Lat": 64.22,
            "Long": 27.73,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+358"
        },
        {
            "Key": 9794,
            "Name": "Rovaniemi",
            "FullName": "Rovaniemi, Finland",
            "Lat": 66.5,
            "Long": 25.73,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+358"
        },
        {
            "Key": 9795,
            "Name": "Tampere",
            "FullName": "Tampere, Finland",
            "Lat": 61.5,
            "Long": 23.77,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+358"
        },
        {
            "Key": 9796,
            "Name": "Turku",
            "FullName": "Turku, Finland",
            "Lat": 60.45,
            "Long": 22.27,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+358"
        },
        {
            "Key": 9797,
            "Name": "Amiens",
            "FullName": "Amiens, France",
            "Lat": 49.89,
            "Long": 2.3,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9798,
            "Name": "Angouleme",
            "FullName": "Angouleme, France",
            "Lat": 45.65,
            "Long": 0.15,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9799,
            "Name": "Annecy",
            "FullName": "Annecy, France",
            "Lat": 45.92,
            "Long": 6.13,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9800,
            "Name": "Annemasse",
            "FullName": "Annemasse, France",
            "Lat": 46.2,
            "Long": 6.24,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9801,
            "Name": "Argenteuil",
            "FullName": "Argenteuil, France",
            "Lat": 48.95,
            "Long": 2.25,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9802,
            "Name": "Bordeaux",
            "FullName": "Bordeaux, France",
            "Lat": 44.84,
            "Long": -0.58,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9803,
            "Name": "Cannes",
            "FullName": "Cannes, France",
            "Lat": 43.55,
            "Long": 7.01,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9804,
            "Name": "Dijon",
            "FullName": "Dijon, France",
            "Lat": 47.29,
            "Long": 5.04,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9805,
            "Name": "Eaubonne",
            "FullName": "Eaubonne, France",
            "Lat": 48.99,
            "Long": 2.28,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9806,
            "Name": "Ile De France",
            "FullName": "Ile De France, France",
            "Lat": 48.85,
            "Long": 2.64,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9807,
            "Name": "Lille",
            "FullName": "Lille, France",
            "Lat": 50.63,
            "Long": 3.06,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9808,
            "Name": "Lione",
            "FullName": "Lione, France",
            "Lat": 45.75,
            "Long": 4.85,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9809,
            "Name": "Lyon",
            "FullName": "Lyon, France",
            "Lat": 45.76,
            "Long": 4.84,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9810,
            "Name": "Marseille",
            "FullName": "Marseille, France",
            "Lat": 43.3,
            "Long": 5.37,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9811,
            "Name": "Metz",
            "FullName": "Metz, France",
            "Lat": 49.12,
            "Long": 6.18,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9812,
            "Name": "Monaco",
            "FullName": "Monaco, France",
            "Lat": 43.73,
            "Long": 7.42,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9813,
            "Name": "Montpellier",
            "FullName": "Montpellier, France",
            "Lat": 43.61,
            "Long": 3.88,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9814,
            "Name": "Nantes",
            "FullName": "Nantes, France",
            "Lat": 47.22,
            "Long": -1.55,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9815,
            "Name": "Nice",
            "FullName": "Nice, France",
            "Lat": 43.7,
            "Long": 7.27,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9816,
            "Name": "Paris",
            "FullName": "Paris, France",
            "Lat": 48.86,
            "Long": 2.35,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9817,
            "Name": "Rennes",
            "FullName": "Rennes, France",
            "Lat": 48.11,
            "Long": -1.68,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9818,
            "Name": "Rodez",
            "FullName": "Rodez, France",
            "Lat": 44.35,
            "Long": 2.58,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9819,
            "Name": "Saint Etienne",
            "FullName": "Saint Etienne, France",
            "Lat": 45.43,
            "Long": 4.39,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9820,
            "Name": "Strasbourg",
            "FullName": "Strasbourg, France",
            "Lat": 48.57,
            "Long": 7.75,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9821,
            "Name": "Toulouse",
            "FullName": "Toulouse, France",
            "Lat": 43.6,
            "Long": 1.44,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+33"
        },
        {
            "Key": 9823,
            "Name": "Aachen",
            "FullName": "Aachen, Germany",
            "Lat": 50.78,
            "Long": 6.08,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9824,
            "Name": "Aschaffenburg",
            "FullName": "Aschaffenburg, Germany",
            "Lat": 49.97,
            "Long": 9.15,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9825,
            "Name": "Augsburg",
            "FullName": "Augsburg, Germany",
            "Lat": 48.37,
            "Long": 10.9,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9826,
            "Name": "Berlin",
            "FullName": "Berlin, Germany",
            "Lat": 52.52,
            "Long": 13.38,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9827,
            "Name": "Bielefeld",
            "FullName": "Bielefeld, Germany",
            "Lat": 52.02,
            "Long": 8.52,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9828,
            "Name": "Bochum",
            "FullName": "Bochum, Germany",
            "Lat": 51.48,
            "Long": 7.22,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9829,
            "Name": "Bonn",
            "FullName": "Bonn, Germany",
            "Lat": 50.73,
            "Long": 7.1,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9830,
            "Name": "Bremen",
            "FullName": "Bremen, Germany",
            "Lat": 53.08,
            "Long": 8.8,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9831,
            "Name": "Cologne",
            "FullName": "Cologne, Germany",
            "Lat": 50.94,
            "Long": 6.95,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9832,
            "Name": "Darmstadt",
            "FullName": "Darmstadt, Germany",
            "Lat": 49.87,
            "Long": 8.65,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9833,
            "Name": "Delmenhorst",
            "FullName": "Delmenhorst, Germany",
            "Lat": 53.05,
            "Long": 8.63,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9834,
            "Name": "Dortmund",
            "FullName": "Dortmund, Germany",
            "Lat": 51.52,
            "Long": 7.47,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9835,
            "Name": "Dresden",
            "FullName": "Dresden, Germany",
            "Lat": 51.03,
            "Long": 13.73,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9836,
            "Name": "Duisburg",
            "FullName": "Duisburg, Germany",
            "Lat": 51.44,
            "Long": 6.76,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9837,
            "Name": "Dusseldorf",
            "FullName": "Dusseldorf, Germany",
            "Lat": 51.23,
            "Long": 6.78,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9838,
            "Name": "Elmshorn",
            "FullName": "Elmshorn, Germany",
            "Lat": 53.75,
            "Long": 9.65,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9839,
            "Name": "Essen",
            "FullName": "Essen, Germany",
            "Lat": 51.45,
            "Long": 7.01,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9840,
            "Name": "Frankfurt",
            "FullName": "Frankfurt, Germany",
            "Lat": 50.12,
            "Long": 8.68,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9841,
            "Name": "Freiburg",
            "FullName": "Freiburg, Germany",
            "Lat": 47.98,
            "Long": 7.85,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9842,
            "Name": "Hamburg",
            "FullName": "Hamburg, Germany",
            "Lat": 53.57,
            "Long": 10,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9843,
            "Name": "Hanover",
            "FullName": "Hanover, Germany",
            "Lat": 52.37,
            "Long": 9.72,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9844,
            "Name": "Herborn",
            "FullName": "Herborn, Germany",
            "Lat": 50.68,
            "Long": 8.31,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9845,
            "Name": "Kaiserslautern",
            "FullName": "Kaiserslautern, Germany",
            "Lat": 49.44,
            "Long": 7.77,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9846,
            "Name": "Karlsruhe",
            "FullName": "Karlsruhe, Germany",
            "Lat": 49.01,
            "Long": 8.4,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9847,
            "Name": "Kiel",
            "FullName": "Kiel, Germany",
            "Lat": 54.33,
            "Long": 10.13,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9848,
            "Name": "Koln",
            "FullName": "Koln, Germany",
            "Lat": 50.94,
            "Long": 6.95,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9849,
            "Name": "Leipzig",
            "FullName": "Leipzig, Germany",
            "Lat": 51.33,
            "Long": 12.38,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9850,
            "Name": "Mannheim",
            "FullName": "Mannheim, Germany",
            "Lat": 49.49,
            "Long": 8.47,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9851,
            "Name": "Munich",
            "FullName": "Munich, Germany",
            "Lat": 48.13,
            "Long": 11.57,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9852,
            "Name": "Munster",
            "FullName": "Munster, Germany",
            "Lat": 51.97,
            "Long": 7.63,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9853,
            "Name": "Nuremberg",
            "FullName": "Nuremberg, Germany",
            "Lat": 49.45,
            "Long": 11.08,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9854,
            "Name": "Oldenburg",
            "FullName": "Oldenburg, Germany",
            "Lat": 53.14,
            "Long": 8.21,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9855,
            "Name": "Reinbek",
            "FullName": "Reinbek, Germany",
            "Lat": 53.51,
            "Long": 10.25,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9856,
            "Name": "Stuttgart",
            "FullName": "Stuttgart, Germany",
            "Lat": 48.78,
            "Long": 9.18,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9857,
            "Name": "Wetzlar",
            "FullName": "Wetzlar, Germany",
            "Lat": 50.57,
            "Long": 8.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9859,
            "Name": "Wiesbaden",
            "FullName": "Wiesbaden, Germany",
            "Lat": 50.08,
            "Long": 8.24,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9860,
            "Name": "Wuppertal",
            "FullName": "Wuppertal, Germany",
            "Lat": 51.27,
            "Long": 7.18,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+49"
        },
        {
            "Key": 9184,
            "Name": "Andorra",
            "FullName": "Andorra, Andorra",
            "Lat": 42.5,
            "Long": 1.52,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+376"
        },
        {
            "Key": 9347,
            "Name": "Antwerp",
            "FullName": "Antwerp, Belgium",
            "Lat": 51.22,
            "Long": 4.4,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9348,
            "Name": "Beringen",
            "FullName": "Beringen, Belgium",
            "Lat": 51.03,
            "Long": 5.22,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9349,
            "Name": "Bruges",
            "FullName": "Bruges, Belgium",
            "Lat": 51.22,
            "Long": 3.23,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9350,
            "Name": "Brussels",
            "FullName": "Brussels, Belgium",
            "Lat": 50.85,
            "Long": 4.35,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9351,
            "Name": "Charleroi",
            "FullName": "Charleroi, Belgium",
            "Lat": 50.4,
            "Long": 4.43,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9352,
            "Name": "Ghent",
            "FullName": "Ghent, Belgium",
            "Lat": 51.05,
            "Long": 3.73,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9353,
            "Name": "Hasselt",
            "FullName": "Hasselt, Belgium",
            "Lat": 50.92,
            "Long": 5.33,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9354,
            "Name": "Kalmthout",
            "FullName": "Kalmthout, Belgium",
            "Lat": 51.38,
            "Long": 4.47,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9355,
            "Name": "Leuven",
            "FullName": "Leuven, Belgium",
            "Lat": 50.88,
            "Long": 4.7,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9356,
            "Name": "Liege",
            "FullName": "Liege, Belgium",
            "Lat": 50.63,
            "Long": 5.57,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9357,
            "Name": "Schilde",
            "FullName": "Schilde, Belgium",
            "Lat": 51.23,
            "Long": 4.57,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9358,
            "Name": "Sint Truiden",
            "FullName": "Sint Truiden, Belgium",
            "Lat": 50.8,
            "Long": 5.18,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+32"
        },
        {
            "Key": 9334,
            "Name": "Bregenz",
            "FullName": "Bregenz, Austria",
            "Lat": 47.51,
            "Long": 9.75,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9335,
            "Name": "Gleisdorf",
            "FullName": "Gleisdorf, Austria",
            "Lat": 47.1,
            "Long": 15.71,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9336,
            "Name": "Graz",
            "FullName": "Graz, Austria",
            "Lat": 47.07,
            "Long": 15.43,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9337,
            "Name": "Innsbruck",
            "FullName": "Innsbruck, Austria",
            "Lat": 47.27,
            "Long": 11.38,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9338,
            "Name": "Linz",
            "FullName": "Linz, Austria",
            "Lat": 48.3,
            "Long": 14.28,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9339,
            "Name": "Salzburg",
            "FullName": "Salzburg, Austria",
            "Lat": 47.8,
            "Long": 13.03,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9340,
            "Name": "Vienna",
            "FullName": "Vienna, Austria",
            "Lat": 48.2,
            "Long": 16.37,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+43"
        },
        {
            "Key": 9757,
            "Name": "Limassol",
            "FullName": "Limassol, Cyprus",
            "Lat": 34.67,
            "Long": 33.03,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+357"
        },
        {
            "Key": 9758,
            "Name": "Nicosia",
            "FullName": "Nicosia, Cyprus",
            "Lat": 35.17,
            "Long": 33.37,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+357"
        },
        {
            "Key": 9759,
            "Name": "Paphos",
            "FullName": "Paphos, Cyprus",
            "Lat": 34.77,
            "Long": 32.42,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+357"
        },
        {
            "Key": 9789,
            "Name": "Tallinn",
            "FullName": "Tallinn, Estonia",
            "Lat": 59.44,
            "Long": 24.75,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+372"
        },
        {
            "Key": 9790,
            "Name": "Viljandi",
            "FullName": "Viljandi, Estonia",
            "Lat": 58.37,
            "Long": 25.6,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+372"
        },
        {
            "Key": 9864,
            "Name": "Agrinio",
            "FullName": "Agrinio, Greece",
            "Lat": 38.62,
            "Long": 21.4,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9865,
            "Name": "Alexandroupoli",
            "FullName": "Alexandroupoli, Greece",
            "Lat": 40.85,
            "Long": 25.87,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9866,
            "Name": "Athens, Attica",
            "FullName": "Athens, Attica, Greece",
            "Lat": 37.97,
            "Long": 23.72,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9867,
            "Name": "Chalcis",
            "FullName": "Chalcis, Greece",
            "Lat": 38.47,
            "Long": 23.6,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9868,
            "Name": "Chania",
            "FullName": "Chania, Greece",
            "Lat": 35.52,
            "Long": 24.02,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9869,
            "Name": "Heraklion",
            "FullName": "Heraklion, Greece",
            "Lat": 35.33,
            "Long": 25.13,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9870,
            "Name": "Ioannina",
            "FullName": "Ioannina, Greece",
            "Lat": 39.67,
            "Long": 20.85,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9871,
            "Name": "Kalamata",
            "FullName": "Kalamata, Greece",
            "Lat": 37.03,
            "Long": 22.12,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9872,
            "Name": "Katerini",
            "FullName": "Katerini, Greece",
            "Lat": 40.27,
            "Long": 22.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9873,
            "Name": "Kavala",
            "FullName": "Kavala, Greece",
            "Lat": 40.93,
            "Long": 24.4,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9874,
            "Name": "Kozani",
            "FullName": "Kozani, Greece",
            "Lat": 40.3,
            "Long": 21.78,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9875,
            "Name": "Lamia",
            "FullName": "Lamia, Greece",
            "Lat": 38.9,
            "Long": 22.44,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9876,
            "Name": "Larissa",
            "FullName": "Larissa, Greece",
            "Lat": 39.64,
            "Long": 22.42,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9877,
            "Name": "Patras",
            "FullName": "Patras, Greece",
            "Lat": 38.25,
            "Long": 21.73,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9878,
            "Name": "Rhodes",
            "FullName": "Rhodes, Greece",
            "Lat": 36.17,
            "Long": 28,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9879,
            "Name": "Serres",
            "FullName": "Serres, Greece",
            "Lat": 41.08,
            "Long": 23.55,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9880,
            "Name": "Thessaloniki",
            "FullName": "Thessaloniki, Greece",
            "Lat": 40.65,
            "Long": 22.9,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9881,
            "Name": "Trikala",
            "FullName": "Trikala, Greece",
            "Lat": 39.55,
            "Long": 21.77,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9882,
            "Name": "Veria",
            "FullName": "Veria, Greece",
            "Lat": 40.52,
            "Long": 22.2,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 9883,
            "Name": "Volos",
            "FullName": "Volos, Greece",
            "Lat": 39.37,
            "Long": 22.93,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+30"
        },
        {
            "Key": 10037,
            "Name": "Alessandria",
            "FullName": "Alessandria, Italy",
            "Lat": 44.91,
            "Long": 8.61,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10038,
            "Name": "Ancona",
            "FullName": "Ancona, Italy",
            "Lat": 43.62,
            "Long": 13.52,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10039,
            "Name": "Bagheria",
            "FullName": "Bagheria, Italy",
            "Lat": 38.08,
            "Long": 13.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10040,
            "Name": "Bari",
            "FullName": "Bari, Italy",
            "Lat": 41.13,
            "Long": 16.87,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10041,
            "Name": "Bergamo",
            "FullName": "Bergamo, Italy",
            "Lat": 45.7,
            "Long": 9.67,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10042,
            "Name": "Bologna",
            "FullName": "Bologna, Italy",
            "Lat": 44.51,
            "Long": 11.35,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10043,
            "Name": "Bolzano",
            "FullName": "Bolzano, Italy",
            "Lat": 46.5,
            "Long": 11.35,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10044,
            "Name": "Brescia",
            "FullName": "Brescia, Italy",
            "Lat": 45.54,
            "Long": 10.22,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10045,
            "Name": "Cagliari",
            "FullName": "Cagliari, Italy",
            "Lat": 39.25,
            "Long": 9.05,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10046,
            "Name": "Caltanissetta",
            "FullName": "Caltanissetta, Italy",
            "Lat": 37.48,
            "Long": 14.07,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10047,
            "Name": "Carpi",
            "FullName": "Carpi, Italy",
            "Lat": 44.78,
            "Long": 10.88,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10048,
            "Name": "Catania",
            "FullName": "Catania, Italy",
            "Lat": 37.5,
            "Long": 15.09,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10049,
            "Name": "Chamonix",
            "FullName": "Chamonix, Italy",
            "Lat": 45.92,
            "Long": 6.87,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10050,
            "Name": "Como",
            "FullName": "Como, Italy",
            "Lat": 45.82,
            "Long": 9.08,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10051,
            "Name": "Courmayer",
            "FullName": "Courmayer, Italy",
            "Lat": 45.78,
            "Long": 6.97,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10052,
            "Name": "Florence",
            "FullName": "Florence, Italy",
            "Lat": 43.78,
            "Long": 11.25,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10053,
            "Name": "Foggia",
            "FullName": "Foggia, Italy",
            "Lat": 41.46,
            "Long": 15.55,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10054,
            "Name": "Genoa",
            "FullName": "Genoa, Italy",
            "Lat": 44.41,
            "Long": 8.93,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10055,
            "Name": "Ivrea",
            "FullName": "Ivrea, Italy",
            "Lat": 45.47,
            "Long": 7.88,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10056,
            "Name": "Lecce",
            "FullName": "Lecce, Italy",
            "Lat": 40.35,
            "Long": 18.17,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10057,
            "Name": "Lucca",
            "FullName": "Lucca, Italy",
            "Lat": 43.85,
            "Long": 10.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10058,
            "Name": "Mappano",
            "FullName": "Mappano, Italy",
            "Lat": 45.15,
            "Long": 7.71,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10059,
            "Name": "Messina",
            "FullName": "Messina, Italy",
            "Lat": 38.18,
            "Long": 15.55,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10060,
            "Name": "Milan",
            "FullName": "Milan, Italy",
            "Lat": 45.47,
            "Long": 9.18,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10061,
            "Name": "Modena",
            "FullName": "Modena, Italy",
            "Lat": 44.65,
            "Long": 10.93,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10062,
            "Name": "Naples",
            "FullName": "Naples, Italy",
            "Lat": 40.84,
            "Long": 14.26,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10063,
            "Name": "Padua",
            "FullName": "Padua, Italy",
            "Lat": 45.42,
            "Long": 11.87,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10064,
            "Name": "Palermo",
            "FullName": "Palermo, Italy",
            "Lat": 38.12,
            "Long": 13.37,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10065,
            "Name": "Palmanova",
            "FullName": "Palmanova, Italy",
            "Lat": 45.9,
            "Long": 13.31,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10066,
            "Name": "Parma",
            "FullName": "Parma, Italy",
            "Lat": 44.8,
            "Long": 10.33,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10067,
            "Name": "Perugia",
            "FullName": "Perugia, Italy",
            "Lat": 43.11,
            "Long": 12.39,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10068,
            "Name": "Pescara",
            "FullName": "Pescara, Italy",
            "Lat": 42.46,
            "Long": 14.21,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10069,
            "Name": "Piacenza",
            "FullName": "Piacenza, Italy",
            "Lat": 45.05,
            "Long": 9.7,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10070,
            "Name": "Pisa",
            "FullName": "Pisa, Italy",
            "Lat": 43.72,
            "Long": 10.4,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10071,
            "Name": "Rimini",
            "FullName": "Rimini, Italy",
            "Lat": 44.05,
            "Long": 12.57,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10072,
            "Name": "Rome",
            "FullName": "Rome, Italy",
            "Lat": 41.9,
            "Long": 12.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10073,
            "Name": "Salerno",
            "FullName": "Salerno, Italy",
            "Lat": 40.68,
            "Long": 14.77,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10074,
            "Name": "Sanremo",
            "FullName": "Sanremo, Italy",
            "Lat": 43.82,
            "Long": 7.78,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10075,
            "Name": "Sassari",
            "FullName": "Sassari, Italy",
            "Lat": 40.73,
            "Long": 8.57,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10076,
            "Name": "Taranto",
            "FullName": "Taranto, Italy",
            "Lat": 40.47,
            "Long": 17.23,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10077,
            "Name": "Trento",
            "FullName": "Trento, Italy",
            "Lat": 46.07,
            "Long": 11.12,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10078,
            "Name": "Trieste",
            "FullName": "Trieste, Italy",
            "Lat": 45.63,
            "Long": 13.8,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10079,
            "Name": "Turin",
            "FullName": "Turin, Italy",
            "Lat": 45.07,
            "Long": 7.7,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10080,
            "Name": "Udine",
            "FullName": "Udine, Italy",
            "Lat": 46.07,
            "Long": 13.23,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10081,
            "Name": "Venice",
            "FullName": "Venice, Italy",
            "Lat": 45.44,
            "Long": 12.34,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10082,
            "Name": "Ventimiglia",
            "FullName": "Ventimiglia, Italy",
            "Lat": 43.79,
            "Long": 7.61,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10083,
            "Name": "Verona",
            "FullName": "Verona, Italy",
            "Lat": 45.43,
            "Long": 10.98,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10085,
            "Name": "Viareggio",
            "FullName": "Viareggio, Italy",
            "Lat": 43.87,
            "Long": 10.23,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10086,
            "Name": "Vicenza",
            "FullName": "Vicenza, Italy",
            "Lat": 45.55,
            "Long": -11.55,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+39"
        },
        {
            "Key": 10027,
            "Name": "Cork",
            "FullName": "Cork, Ireland",
            "Lat": 51.9,
            "Long": -8.47,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+353"
        },
        {
            "Key": 10028,
            "Name": "Dublin",
            "FullName": "Dublin, Ireland",
            "Lat": 53.35,
            "Long": -6.26,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+353"
        },
        {
            "Key": 10029,
            "Name": "Monaghan",
            "FullName": "Monaghan, Ireland",
            "Lat": 54.25,
            "Long": -6.97,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+353"
        },
        {
            "Key": 10129,
            "Name": "Riga",
            "FullName": "Riga, Latvia",
            "Lat": 56.95,
            "Long": 24.11,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+371"
        },
        {
            "Key": 10149,
            "Name": "Valletta",
            "FullName": "Valletta, Malta",
            "Lat": 35.9,
            "Long": 14.51,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+356"
        },
        {
            "Key": 10268,
            "Name": "Almere",
            "FullName": "Almere, Netherlands",
            "Lat": 52.37,
            "Long": 5.22,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10269,
            "Name": "Amersfoort",
            "FullName": "Amersfoort, Netherlands",
            "Lat": 52.15,
            "Long": 5.38,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10270,
            "Name": "Amsterdam",
            "FullName": "Amsterdam, Netherlands",
            "Lat": 52.37,
            "Long": 4.9,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10271,
            "Name": "Apeldoorn",
            "FullName": "Apeldoorn, Netherlands",
            "Lat": 52.22,
            "Long": 5.97,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10272,
            "Name": "Arnhem",
            "FullName": "Arnhem, Netherlands",
            "Lat": 51.98,
            "Long": 5.92,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10273,
            "Name": "Breda",
            "FullName": "Breda, Netherlands",
            "Lat": 51.58,
            "Long": 4.78,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10274,
            "Name": "Delft",
            "FullName": "Delft, Netherlands",
            "Lat": 52.02,
            "Long": 4.37,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10275,
            "Name": "Eindhoven",
            "FullName": "Eindhoven, Netherlands",
            "Lat": 51.43,
            "Long": 5.48,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10276,
            "Name": "Enschede",
            "FullName": "Enschede, Netherlands",
            "Lat": 52.22,
            "Long": 6.9,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10277,
            "Name": "Geleen",
            "FullName": "Geleen, Netherlands",
            "Lat": 50.97,
            "Long": 5.83,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10278,
            "Name": "Gronau",
            "FullName": "Gronau, Netherlands",
            "Lat": 52.2,
            "Long": 7.04,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10279,
            "Name": "Groningen",
            "FullName": "Groningen, Netherlands",
            "Lat": 53.22,
            "Long": 6.57,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10280,
            "Name": "Haarlem",
            "FullName": "Haarlem, Netherlands",
            "Lat": 52.38,
            "Long": 4.63,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10281,
            "Name": "Heerlen",
            "FullName": "Heerlen, Netherlands",
            "Lat": 50.88,
            "Long": 5.98,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10282,
            "Name": "Kerkrade",
            "FullName": "Kerkrade, Netherlands",
            "Lat": 50.87,
            "Long": 6.07,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10283,
            "Name": "Leeuwarden",
            "FullName": "Leeuwarden, Netherlands",
            "Lat": 53.2,
            "Long": 5.78,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10284,
            "Name": "Limburg",
            "FullName": "Limburg, Netherlands",
            "Lat": 51.44,
            "Long": 6.06,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10285,
            "Name": "Maastricht",
            "FullName": "Maastricht, Netherlands",
            "Lat": 50.85,
            "Long": 5.68,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10286,
            "Name": "Nijmegen",
            "FullName": "Nijmegen, Netherlands",
            "Lat": 51.85,
            "Long": 5.87,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10287,
            "Name": "Roermond",
            "FullName": "Roermond, Netherlands",
            "Lat": 51.2,
            "Long": 5.98,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10288,
            "Name": "Rotterdam",
            "FullName": "Rotterdam, Netherlands",
            "Lat": 51.92,
            "Long": 4.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10289,
            "Name": "Schiedam",
            "FullName": "Schiedam, Netherlands",
            "Lat": 51.92,
            "Long": 4.4,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10290,
            "Name": "Sittard",
            "FullName": "Sittard, Netherlands",
            "Lat": 51,
            "Long": 5.87,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10291,
            "Name": "The Hague",
            "FullName": "The Hague, Netherlands",
            "Lat": 52.08,
            "Long": 4.32,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10292,
            "Name": "Utrecht",
            "FullName": "Utrecht, Netherlands",
            "Lat": 52.08,
            "Long": 5.12,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10293,
            "Name": "Veenendaal",
            "FullName": "Veenendaal, Netherlands",
            "Lat": 52.02,
            "Long": 5.55,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10294,
            "Name": "Venlo",
            "FullName": "Venlo, Netherlands",
            "Lat": 51.37,
            "Long": 6.17,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10295,
            "Name": "Wageningen",
            "FullName": "Wageningen, Netherlands",
            "Lat": 51.97,
            "Long": 5.67,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10296,
            "Name": "Zeist",
            "FullName": "Zeist, Netherlands",
            "Lat": 52.08,
            "Long": 5.23,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10297,
            "Name": "Zoetermeer",
            "FullName": "Zoetermeer, Netherlands",
            "Lat": 52.07,
            "Long": 4.5,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+31"
        },
        {
            "Key": 10134,
            "Name": "Kaunas",
            "FullName": "Kaunas, Lithuania",
            "Lat": 54.9,
            "Long": 23.89,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+370"
        },
        {
            "Key": 10135,
            "Name": "Vilnius",
            "FullName": "Vilnius, Lithuania",
            "Lat": 54.68,
            "Long": 25.28,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+370"
        },
        {
            "Key": 10254,
            "Name": "Podgorica",
            "FullName": "Podgorica, Montenegro",
            "Lat": 42.44,
            "Long": 19.26,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+382"
        },
        {
            "Key": 10663,
            "Name": "Alicante",
            "FullName": "Alicante, Spain",
            "Lat": 38.35,
            "Long": -0.48,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10664,
            "Name": "Badajoz",
            "FullName": "Badajoz, Spain",
            "Lat": 38.88,
            "Long": -6.97,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10665,
            "Name": "Barcelona",
            "FullName": "Barcelona, Spain",
            "Lat": 41.38,
            "Long": 2.18,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10666,
            "Name": "Bilbao",
            "FullName": "Bilbao, Spain",
            "Lat": 43.26,
            "Long": -2.92,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10667,
            "Name": "Cadiz,  Andalusia",
            "FullName": "Cadiz,  Andalusia, Spain",
            "Lat": 36.53,
            "Long": -6.28,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10668,
            "Name": "Cordoba",
            "FullName": "Cordoba, Spain",
            "Lat": 37.88,
            "Long": -4.77,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10669,
            "Name": "El Prat De Llobregat",
            "FullName": "El Prat De Llobregat, Spain",
            "Lat": 41.33,
            "Long": 2.1,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10670,
            "Name": "Elche",
            "FullName": "Elche, Spain",
            "Lat": 38.27,
            "Long": -0.7,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10671,
            "Name": "Gijon",
            "FullName": "Gijon, Spain",
            "Lat": 43.53,
            "Long": -5.7,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10672,
            "Name": "Granada",
            "FullName": "Granada, Spain",
            "Lat": 37.18,
            "Long": -3.6,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10673,
            "Name": "Las Palmas",
            "FullName": "Las Palmas, Spain",
            "Lat": 28.15,
            "Long": -15.42,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10674,
            "Name": "Lleida",
            "FullName": "Lleida, Spain",
            "Lat": 41.62,
            "Long": 0.63,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10675,
            "Name": "Madrid",
            "FullName": "Madrid, Spain",
            "Lat": 40.4,
            "Long": -3.72,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10676,
            "Name": "Malaga",
            "FullName": "Malaga, Spain",
            "Lat": 36.72,
            "Long": -4.42,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10677,
            "Name": "Marbella",
            "FullName": "Marbella, Spain",
            "Lat": 36.52,
            "Long": -4.88,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10678,
            "Name": "Murcia",
            "FullName": "Murcia, Spain",
            "Lat": 37.99,
            "Long": -1.13,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10679,
            "Name": "Oviedo",
            "FullName": "Oviedo, Spain",
            "Lat": 43.35,
            "Long": -5.84,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10680,
            "Name": "Palma",
            "FullName": "Palma, Spain",
            "Lat": 39.57,
            "Long": 2.65,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10681,
            "Name": "Puerto La Cruz",
            "FullName": "Puerto La Cruz, Spain",
            "Lat": 10.2,
            "Long": -64.64,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10682,
            "Name": "Santa Cruz De Tenerife",
            "FullName": "Santa Cruz De Tenerife, Spain",
            "Lat": 28.47,
            "Long": -16.25,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10683,
            "Name": "Seville",
            "FullName": "Seville, Spain",
            "Lat": 37.38,
            "Long": -5.99,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10684,
            "Name": "Tarragona",
            "FullName": "Tarragona, Spain",
            "Lat": 41.12,
            "Long": 1.25,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10685,
            "Name": "Valencia",
            "FullName": "Valencia, Spain",
            "Lat": 39.47,
            "Long": -0.38,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10686,
            "Name": "Valladolid",
            "FullName": "Valladolid, Spain",
            "Lat": 41.63,
            "Long": -4.72,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10687,
            "Name": "Vigo",
            "FullName": "Vigo, Spain",
            "Lat": 42.23,
            "Long": -8.71,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10688,
            "Name": "Zaragoza",
            "FullName": "Zaragoza, Spain",
            "Lat": 41.65,
            "Long": -0.88,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+34"
        },
        {
            "Key": 10629,
            "Name": "Bratislava",
            "FullName": "Bratislava, Slovakia",
            "Lat": 48.14,
            "Long": 17.11,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+421"
        },
        {
            "Key": 10630,
            "Name": "Trnava",
            "FullName": "Trnava, Slovakia",
            "Lat": 48.38,
            "Long": 17.59,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+421"
        },
        {
            "Key": 10631,
            "Name": "Ljubljana",
            "FullName": "Ljubljana, Slovenia",
            "Lat": 46.06,
            "Long": 14.51,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+386"
        },
        {
            "Key": 10632,
            "Name": "Maribor",
            "FullName": "Maribor, Slovenia",
            "Lat": 46.55,
            "Long": 15.65,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+386"
        },
        {
            "Key": 10545,
            "Name": "Lisbon",
            "FullName": "Lisbon, Portugal",
            "Lat": 38.71,
            "Long": -9.14,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+351"
        },
        {
            "Key": 10546,
            "Name": "Oeiras",
            "FullName": "Oeiras, Portugal",
            "Lat": 38.68,
            "Long": -9.32,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+351"
        },
        {
            "Key": 10547,
            "Name": "Porto",
            "FullName": "Porto, Portugal",
            "Lat": 41.16,
            "Long": -8.62,
            "CurrencyID": 50,
            "Currency": "EUR",
            "CountryCode": "+351"
        },
        {
            "Key": 10766,
            "Name": "Aberdeen",
            "FullName": "Aberdeen, United Kingdom",
            "Lat": 57.15,
            "Long": -2.11,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10767,
            "Name": "Ashby De La Zouch",
            "FullName": "Ashby De La Zouch, United Kingdom",
            "Lat": 52.75,
            "Long": -1.47,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10768,
            "Name": "Ashford",
            "FullName": "Ashford, United Kingdom",
            "Lat": 51.15,
            "Long": 0.87,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10769,
            "Name": "Bedford",
            "FullName": "Bedford, United Kingdom",
            "Lat": 52.13,
            "Long": -0.46,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10770,
            "Name": "Belfast",
            "FullName": "Belfast, United Kingdom",
            "Lat": 54.6,
            "Long": -5.93,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10771,
            "Name": "Birmingham",
            "FullName": "Birmingham, United Kingdom",
            "Lat": 52.48,
            "Long": -1.89,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10772,
            "Name": "Blackburn",
            "FullName": "Blackburn, United Kingdom",
            "Lat": 53.75,
            "Long": -2.48,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10773,
            "Name": "Bracknell",
            "FullName": "Bracknell, United Kingdom",
            "Lat": 51.42,
            "Long": -0.75,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10774,
            "Name": "Bradford",
            "FullName": "Bradford, United Kingdom",
            "Lat": 53.8,
            "Long": -1.75,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10775,
            "Name": "Bradford On Avon",
            "FullName": "Bradford On Avon, United Kingdom",
            "Lat": 51.35,
            "Long": -2.25,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10776,
            "Name": "Brighton",
            "FullName": "Brighton, United Kingdom",
            "Lat": 50.84,
            "Long": -0.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10777,
            "Name": "Brighton Hove",
            "FullName": "Brighton Hove, United Kingdom",
            "Lat": 50.84,
            "Long": -0.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10778,
            "Name": "Bristol",
            "FullName": "Bristol, United Kingdom",
            "Lat": 51.45,
            "Long": -2.58,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10779,
            "Name": "Camberley",
            "FullName": "Camberley, United Kingdom",
            "Lat": 51.34,
            "Long": -0.74,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10780,
            "Name": "Cambridge",
            "FullName": "Cambridge, United Kingdom",
            "Lat": 52.2,
            "Long": 0.12,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10781,
            "Name": "Cannock",
            "FullName": "Cannock, United Kingdom",
            "Lat": 52.69,
            "Long": -2.03,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10782,
            "Name": "Cardiff",
            "FullName": "Cardiff, United Kingdom",
            "Lat": 51.48,
            "Long": -3.18,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10783,
            "Name": "Carlisle",
            "FullName": "Carlisle, United Kingdom",
            "Lat": 54.89,
            "Long": -2.94,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10784,
            "Name": "Chester",
            "FullName": "Chester, United Kingdom",
            "Lat": 53.19,
            "Long": -2.89,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10785,
            "Name": "Chichester",
            "FullName": "Chichester, United Kingdom",
            "Lat": 50.84,
            "Long": -0.78,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10786,
            "Name": "Chorley",
            "FullName": "Chorley, United Kingdom",
            "Lat": 53.65,
            "Long": -2.62,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10787,
            "Name": "Coventry",
            "FullName": "Coventry, United Kingdom",
            "Lat": 52.41,
            "Long": -1.51,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10788,
            "Name": "Dagenham",
            "FullName": "Dagenham, United Kingdom",
            "Lat": 51.55,
            "Long": 0.17,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10789,
            "Name": "Derby",
            "FullName": "Derby, United Kingdom",
            "Lat": 52.92,
            "Long": -1.48,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10790,
            "Name": "Dundee",
            "FullName": "Dundee, United Kingdom",
            "Lat": 56.46,
            "Long": -2.97,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10791,
            "Name": "Edinburg",
            "FullName": "Edinburg, United Kingdom",
            "Lat": 55.95,
            "Long": -3.2,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10792,
            "Name": "Edinburgh",
            "FullName": "Edinburgh, United Kingdom",
            "Lat": 55.95,
            "Long": -3.19,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10793,
            "Name": "Exeter",
            "FullName": "Exeter, United Kingdom",
            "Lat": 50.72,
            "Long": -3.53,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10794,
            "Name": "Glasgow",
            "FullName": "Glasgow, United Kingdom",
            "Lat": 55.86,
            "Long": -4.26,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10795,
            "Name": "Gloucester",
            "FullName": "Gloucester, United Kingdom",
            "Lat": 51.87,
            "Long": -2.24,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10796,
            "Name": "Guildford",
            "FullName": "Guildford, United Kingdom",
            "Lat": 51.24,
            "Long": -0.57,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10797,
            "Name": "Hull",
            "FullName": "Hull, United Kingdom",
            "Lat": 53.74,
            "Long": -0.33,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10798,
            "Name": "Kingston Upon Thames",
            "FullName": "Kingston Upon Thames, United Kingdom",
            "Lat": 51.41,
            "Long": -0.3,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10799,
            "Name": "Lancaster",
            "FullName": "Lancaster, United Kingdom",
            "Lat": 54.05,
            "Long": -2.8,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10800,
            "Name": "Lapworth",
            "FullName": "Lapworth, United Kingdom",
            "Lat": 52.34,
            "Long": -1.76,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10801,
            "Name": "Leeds",
            "FullName": "Leeds, United Kingdom",
            "Lat": 53.8,
            "Long": -1.55,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10802,
            "Name": "Leicester",
            "FullName": "Leicester, United Kingdom",
            "Lat": 52.63,
            "Long": -1.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10803,
            "Name": "Lewes",
            "FullName": "Lewes, United Kingdom",
            "Lat": 50.87,
            "Long": 0.01,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10804,
            "Name": "Lewis",
            "FullName": "Lewis, United Kingdom",
            "Lat": 58.22,
            "Long": -6.39,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10805,
            "Name": "Harris",
            "FullName": "Harris, United Kingdom",
            "Lat": 57.91,
            "Long": -6.83,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10806,
            "Name": "Lichfield",
            "FullName": "Lichfield, United Kingdom",
            "Lat": 52.68,
            "Long": -1.83,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10807,
            "Name": "Lisburn",
            "FullName": "Lisburn, United Kingdom",
            "Lat": 54.51,
            "Long": -6.03,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10808,
            "Name": "Littlehampton",
            "FullName": "Littlehampton, United Kingdom",
            "Lat": 50.81,
            "Long": -0.54,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10809,
            "Name": "Liverpool",
            "FullName": "Liverpool, United Kingdom",
            "Lat": 53.4,
            "Long": -3,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10810,
            "Name": "London",
            "FullName": "London, United Kingdom",
            "Lat": 51.51,
            "Long": -0.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10811,
            "Name": "London, Surrey",
            "FullName": "London, Surrey, United Kingdom",
            "Lat": 51.24,
            "Long": -0.59,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10812,
            "Name": "Loughborough",
            "FullName": "Loughborough, United Kingdom",
            "Lat": 52.77,
            "Long": -1.2,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10813,
            "Name": "Luton",
            "FullName": "Luton, United Kingdom",
            "Lat": 51.9,
            "Long": -0.43,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10814,
            "Name": "Manchester",
            "FullName": "Manchester, United Kingdom",
            "Lat": 53.47,
            "Long": -2.23,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10815,
            "Name": "Mcallen",
            "FullName": "Mcallen, United Kingdom",
            "Lat": 51.24,
            "Long": -2.58,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10816,
            "Name": "Newcastle",
            "FullName": "Newcastle, United Kingdom",
            "Lat": 54.97,
            "Long": -1.6,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10817,
            "Name": "Newcastle Upon Tyne",
            "FullName": "Newcastle Upon Tyne, United Kingdom",
            "Lat": 54.97,
            "Long": -1.6,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10818,
            "Name": "Newport",
            "FullName": "Newport, United Kingdom",
            "Lat": 51.58,
            "Long": -3,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10819,
            "Name": "Northampton",
            "FullName": "Northampton, United Kingdom",
            "Lat": 52.24,
            "Long": -0.9,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10820,
            "Name": "Norwich",
            "FullName": "Norwich, United Kingdom",
            "Lat": 52.63,
            "Long": 1.3,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10821,
            "Name": "Nottingham",
            "FullName": "Nottingham, United Kingdom",
            "Lat": 52.95,
            "Long": -1.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10822,
            "Name": "Nottinghsm",
            "FullName": "Nottinghsm, United Kingdom",
            "Lat": 52.83,
            "Long": -1.33,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10823,
            "Name": "Ossett",
            "FullName": "Ossett, United Kingdom",
            "Lat": 53.68,
            "Long": 1.58,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10824,
            "Name": "Otley",
            "FullName": "Otley, United Kingdom",
            "Lat": 53.91,
            "Long": -1.69,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10825,
            "Name": "Oxford",
            "FullName": "Oxford, United Kingdom",
            "Lat": 51.75,
            "Long": -1.26,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10826,
            "Name": "Oxted",
            "FullName": "Oxted, United Kingdom",
            "Lat": 51.26,
            "Long": -0.01,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10827,
            "Name": "Paignton",
            "FullName": "Paignton, United Kingdom",
            "Lat": 50.44,
            "Long": -3.57,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10828,
            "Name": "Penzance",
            "FullName": "Penzance, United Kingdom",
            "Lat": 50.12,
            "Long": -5.54,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10829,
            "Name": "Peterborough",
            "FullName": "Peterborough, United Kingdom",
            "Lat": 52.58,
            "Long": -0.25,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10830,
            "Name": "Plymouth",
            "FullName": "Plymouth, United Kingdom",
            "Lat": 50.37,
            "Long": -4.14,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10831,
            "Name": "Pontypridd",
            "FullName": "Pontypridd, United Kingdom",
            "Lat": 51.6,
            "Long": -3.34,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10832,
            "Name": "Portsmouth",
            "FullName": "Portsmouth, United Kingdom",
            "Lat": 50.82,
            "Long": -1.08,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10833,
            "Name": "Preston",
            "FullName": "Preston, United Kingdom",
            "Lat": 53.76,
            "Long": -2.7,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10834,
            "Name": "Reading",
            "FullName": "Reading, United Kingdom",
            "Lat": 51.45,
            "Long": -0.97,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10835,
            "Name": "Redditch",
            "FullName": "Redditch, United Kingdom",
            "Lat": 52.32,
            "Long": -1.93,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10836,
            "Name": "Reigate",
            "FullName": "Reigate, United Kingdom",
            "Lat": 51.23,
            "Long": -0.19,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10837,
            "Name": "Richmond",
            "FullName": "Richmond, United Kingdom",
            "Lat": 51.51,
            "Long": -0.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10838,
            "Name": "Salford",
            "FullName": "Salford, United Kingdom",
            "Lat": 53.48,
            "Long": -2.29,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10839,
            "Name": "Salisbury",
            "FullName": "Salisbury, United Kingdom",
            "Lat": 51.07,
            "Long": -1.79,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10840,
            "Name": "Sheffield",
            "FullName": "Sheffield, United Kingdom",
            "Lat": 53.38,
            "Long": -1.47,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10841,
            "Name": "Shefford",
            "FullName": "Shefford, United Kingdom",
            "Lat": 52.04,
            "Long": -0.33,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10842,
            "Name": "Shepshed",
            "FullName": "Shepshed, United Kingdom",
            "Lat": 52.77,
            "Long": -1.3,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10843,
            "Name": "Solihull",
            "FullName": "Solihull, United Kingdom",
            "Lat": 52.41,
            "Long": -1.78,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10844,
            "Name": "Southampton",
            "FullName": "Southampton, United Kingdom",
            "Lat": 50.9,
            "Long": -1.4,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10845,
            "Name": "St Albans",
            "FullName": "St Albans, United Kingdom",
            "Lat": 51.76,
            "Long": -0.34,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10846,
            "Name": "Stoke On Trent",
            "FullName": "Stoke On Trent, United Kingdom",
            "Lat": 53,
            "Long": -2.18,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10847,
            "Name": "Stornoway",
            "FullName": "Stornoway, United Kingdom",
            "Lat": 58.21,
            "Long": -6.39,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10848,
            "Name": "Sunderland",
            "FullName": "Sunderland, United Kingdom",
            "Lat": 54.91,
            "Long": -1.39,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10849,
            "Name": "Surbiton",
            "FullName": "Surbiton, United Kingdom",
            "Lat": 51.39,
            "Long": -0.3,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10850,
            "Name": "Sutton Coldfield",
            "FullName": "Sutton Coldfield, United Kingdom",
            "Lat": 52.56,
            "Long": -1.82,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10851,
            "Name": "Swansea",
            "FullName": "Swansea, United Kingdom",
            "Lat": 51.62,
            "Long": -3.95,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10852,
            "Name": "Tamworth",
            "FullName": "Tamworth, United Kingdom",
            "Lat": 52.63,
            "Long": -1.7,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10853,
            "Name": "Tavistock",
            "FullName": "Tavistock, United Kingdom",
            "Lat": 50.55,
            "Long": -4.14,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10854,
            "Name": "Torquay",
            "FullName": "Torquay, United Kingdom",
            "Lat": 50.48,
            "Long": -3.53,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10855,
            "Name": "Totnes",
            "FullName": "Totnes, United Kingdom",
            "Lat": 50.43,
            "Long": -3.68,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10856,
            "Name": "Trowbridge",
            "FullName": "Trowbridge, United Kingdom",
            "Lat": 51.32,
            "Long": -2.21,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10857,
            "Name": "Twickenham",
            "FullName": "Twickenham, United Kingdom",
            "Lat": 51.45,
            "Long": -0.34,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10858,
            "Name": "Wakefield",
            "FullName": "Wakefield, United Kingdom",
            "Lat": 53.68,
            "Long": -1.49,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10859,
            "Name": "Wallingford",
            "FullName": "Wallingford, United Kingdom",
            "Lat": 51.6,
            "Long": -1.12,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10860,
            "Name": "Walsall",
            "FullName": "Walsall, United Kingdom",
            "Lat": 52.58,
            "Long": -1.98,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10861,
            "Name": "West Bridgford",
            "FullName": "West Bridgford, United Kingdom",
            "Lat": 52.92,
            "Long": -1.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10862,
            "Name": "Westminster",
            "FullName": "Westminster, United Kingdom",
            "Lat": 51.5,
            "Long": -0.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10863,
            "Name": "Wetherby",
            "FullName": "Wetherby, United Kingdom",
            "Lat": 53.93,
            "Long": -1.39,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10864,
            "Name": "Wiltshire",
            "FullName": "Wiltshire, United Kingdom",
            "Lat": 51.25,
            "Long": -1.99,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10865,
            "Name": "Winchester",
            "FullName": "Winchester, United Kingdom",
            "Lat": 51.06,
            "Long": -1.31,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10866,
            "Name": "Wolverhampton",
            "FullName": "Wolverhampton, United Kingdom",
            "Lat": 52.58,
            "Long": -2.13,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10867,
            "Name": "Worcester",
            "FullName": "Worcester, United Kingdom",
            "Lat": 52.19,
            "Long": -2.22,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10868,
            "Name": "Worthing",
            "FullName": "Worthing, United Kingdom",
            "Lat": 50.81,
            "Long": -0.37,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10869,
            "Name": "York",
            "FullName": "York, United Kingdom",
            "Lat": 53.96,
            "Long": -1.08,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 10030,
            "Name": "Douglas",
            "FullName": "Douglas, Isle Of Man",
            "Lat": 54.15,
            "Long": -4.48,
            "CurrencyID": 51,
            "Currency": "GBP",
            "CountryCode": "+44"
        },
        {
            "Key": 9822,
            "Name": "Tbilisi",
            "FullName": "Tbilisi, Georgia",
            "Lat": 41.72,
            "Long": 44.78,
            "CurrencyID": 52,
            "Currency": "GEL",
            "CountryCode": "+995"
        },
        {
            "Key": 9861,
            "Name": "Accra",
            "FullName": "Accra, Ghana",
            "Lat": 5.55,
            "Long": -0.2,
            "CurrencyID": 53,
            "Currency": "GHS",
            "CountryCode": "+233"
        },
        {
            "Key": 9862,
            "Name": "Kumasi",
            "FullName": "Kumasi, Ghana",
            "Lat": 6.67,
            "Long": -1.62,
            "CurrencyID": 53,
            "Currency": "GHS",
            "CountryCode": "+233"
        },
        {
            "Key": 9863,
            "Name": "Tema",
            "FullName": "Tema, Ghana",
            "Lat": 5.67,
            "Long": 0,
            "CurrencyID": 53,
            "Currency": "GHS",
            "CountryCode": "+233"
        },
        {
            "Key": 9890,
            "Name": "Conakry",
            "FullName": "Conakry, Guinea",
            "Lat": 9.51,
            "Long": -13.71,
            "CurrencyID": 54,
            "Currency": "GNF",
            "CountryCode": "+224"
        },
        {
            "Key": 9884,
            "Name": "Antigua Guatemala",
            "FullName": "Antigua Guatemala, Guatemala",
            "Lat": 14.57,
            "Long": -90.73,
            "CurrencyID": 55,
            "Currency": "GTQ",
            "CountryCode": "+502"
        },
        {
            "Key": 9885,
            "Name": "Coban",
            "FullName": "Coban, Guatemala",
            "Lat": 15.48,
            "Long": -90.37,
            "CurrencyID": 55,
            "Currency": "GTQ",
            "CountryCode": "+502"
        },
        {
            "Key": 9886,
            "Name": "Guatemala City",
            "FullName": "Guatemala City, Guatemala",
            "Lat": 14.61,
            "Long": -90.54,
            "CurrencyID": 55,
            "Currency": "GTQ",
            "CountryCode": "+502"
        },
        {
            "Key": 9887,
            "Name": "Mixco",
            "FullName": "Mixco, Guatemala",
            "Lat": 14.63,
            "Long": -90.61,
            "CurrencyID": 55,
            "Currency": "GTQ",
            "CountryCode": "+502"
        },
        {
            "Key": 9888,
            "Name": "San Juan Sacatepequez",
            "FullName": "San Juan Sacatepequez, Guatemala",
            "Lat": 14.72,
            "Long": -90.64,
            "CurrencyID": 55,
            "Currency": "GTQ",
            "CountryCode": "+502"
        },
        {
            "Key": 9889,
            "Name": "Villa Nueva",
            "FullName": "Villa Nueva, Guatemala",
            "Lat": 14.53,
            "Long": -90.59,
            "CurrencyID": 55,
            "Currency": "GTQ",
            "CountryCode": "+502"
        },
        {
            "Key": 9896,
            "Name": "Hong Kong",
            "FullName": "Hong Kong, Hong Kong",
            "Lat": 22.28,
            "Long": 114.17,
            "CurrencyID": 56,
            "Currency": "HKD",
            "CountryCode": "+852"
        },
        {
            "Key": 9891,
            "Name": "Choloma",
            "FullName": "Choloma, Honduras",
            "Lat": 15.63,
            "Long": -88,
            "CurrencyID": 57,
            "Currency": "HNL",
            "CountryCode": "+504"
        },
        {
            "Key": 9892,
            "Name": "El Progreso",
            "FullName": "El Progreso, Honduras",
            "Lat": 15.4,
            "Long": -87.8,
            "CurrencyID": 57,
            "Currency": "HNL",
            "CountryCode": "+504"
        },
        {
            "Key": 9893,
            "Name": "La Ceiba",
            "FullName": "La Ceiba, Honduras",
            "Lat": 15.77,
            "Long": -86.83,
            "CurrencyID": 57,
            "Currency": "HNL",
            "CountryCode": "+504"
        },
        {
            "Key": 9894,
            "Name": "San Pedro Sula",
            "FullName": "San Pedro Sula, Honduras",
            "Lat": 15.5,
            "Long": -88.03,
            "CurrencyID": 57,
            "Currency": "HNL",
            "CountryCode": "+504"
        },
        {
            "Key": 9895,
            "Name": "Tegucigalpa",
            "FullName": "Tegucigalpa, Honduras",
            "Lat": 14.1,
            "Long": -87.22,
            "CurrencyID": 57,
            "Currency": "HNL",
            "CountryCode": "+504"
        },
        {
            "Key": 9750,
            "Name": "Osijek",
            "FullName": "Osijek, Croatia",
            "Lat": 45.56,
            "Long": 18.68,
            "CurrencyID": 58,
            "Currency": "HRK",
            "CountryCode": "+385"
        },
        {
            "Key": 9751,
            "Name": "Pula",
            "FullName": "Pula, Croatia",
            "Lat": 44.87,
            "Long": 13.85,
            "CurrencyID": 58,
            "Currency": "HRK",
            "CountryCode": "+385"
        },
        {
            "Key": 9752,
            "Name": "Rijeka",
            "FullName": "Rijeka, Croatia",
            "Lat": 45.32,
            "Long": 14.42,
            "CurrencyID": 58,
            "Currency": "HRK",
            "CountryCode": "+385"
        },
        {
            "Key": 9753,
            "Name": "Split",
            "FullName": "Split, Croatia",
            "Lat": 43.51,
            "Long": 16.45,
            "CurrencyID": 58,
            "Currency": "HRK",
            "CountryCode": "+385"
        },
        {
            "Key": 9754,
            "Name": "Zadar",
            "FullName": "Zadar, Croatia",
            "Lat": 44.11,
            "Long": 15.23,
            "CurrencyID": 58,
            "Currency": "HRK",
            "CountryCode": "+385"
        },
        {
            "Key": 9755,
            "Name": "Zagreb",
            "FullName": "Zagreb, Croatia",
            "Lat": 45.82,
            "Long": 15.98,
            "CurrencyID": 58,
            "Currency": "HRK",
            "CountryCode": "+385"
        },
        {
            "Key": 9897,
            "Name": "Budapest",
            "FullName": "Budapest, Hungary",
            "Lat": 47.49,
            "Long": 19.05,
            "CurrencyID": 59,
            "Currency": "HUF",
            "CountryCode": "+36"
        },
        {
            "Key": 10004,
            "Name": "Bali",
            "FullName": "Bali, Indonesia",
            "Lat": -8.65,
            "Long": 115.22,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10005,
            "Name": "Bandar Lampung",
            "FullName": "Bandar Lampung, Indonesia",
            "Lat": -5.45,
            "Long": 105.27,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10006,
            "Name": "Bandung",
            "FullName": "Bandung, Indonesia",
            "Lat": -6.92,
            "Long": 107.6,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10007,
            "Name": "Batam",
            "FullName": "Batam, Indonesia",
            "Lat": 1.08,
            "Long": 104.03,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10008,
            "Name": "Bekasi",
            "FullName": "Bekasi, Indonesia",
            "Lat": -6.23,
            "Long": 107,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10009,
            "Name": "Bogor",
            "FullName": "Bogor, Indonesia",
            "Lat": -6.6,
            "Long": 106.8,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10010,
            "Name": "Denpasar",
            "FullName": "Denpasar, Indonesia",
            "Lat": -8.65,
            "Long": 115.22,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10011,
            "Name": "Depok",
            "FullName": "Depok, Indonesia",
            "Lat": -6.39,
            "Long": 106.83,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10012,
            "Name": "Jakarta",
            "FullName": "Jakarta, Indonesia",
            "Lat": -6.17,
            "Long": 106.82,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10013,
            "Name": "Makassar",
            "FullName": "Makassar, Indonesia",
            "Lat": -5.13,
            "Long": 119.42,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10014,
            "Name": "Malang",
            "FullName": "Malang, Indonesia",
            "Lat": -7.98,
            "Long": 112.62,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10015,
            "Name": "Medan",
            "FullName": "Medan, Indonesia",
            "Lat": 3.58,
            "Long": 98.67,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10016,
            "Name": "Padang",
            "FullName": "Padang, Indonesia",
            "Lat": -0.95,
            "Long": 100.35,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10017,
            "Name": "Palembang",
            "FullName": "Palembang, Indonesia",
            "Lat": -2.99,
            "Long": 104.76,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10018,
            "Name": "Pekanbaru",
            "FullName": "Pekanbaru, Indonesia",
            "Lat": 0.53,
            "Long": 101.45,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10019,
            "Name": "Samarinda",
            "FullName": "Samarinda, Indonesia",
            "Lat": -0.5,
            "Long": 117.15,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10020,
            "Name": "Semarang",
            "FullName": "Semarang, Indonesia",
            "Lat": -6.97,
            "Long": 110.42,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10021,
            "Name": "South Tangerang",
            "FullName": "South Tangerang, Indonesia",
            "Lat": -6.29,
            "Long": 106.72,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10022,
            "Name": "Surabaya",
            "FullName": "Surabaya, Indonesia",
            "Lat": -7.27,
            "Long": 112.74,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10023,
            "Name": "Tangerang",
            "FullName": "Tangerang, Indonesia",
            "Lat": -6.18,
            "Long": 106.63,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10024,
            "Name": "Tasikmalaya",
            "FullName": "Tasikmalaya, Indonesia",
            "Lat": -7.33,
            "Long": 108.2,
            "CurrencyID": 60,
            "Currency": "IDR",
            "CountryCode": "+62"
        },
        {
            "Key": 10031,
            "Name": "Haifa",
            "FullName": "Haifa, Israel",
            "Lat": 32.82,
            "Long": 34.98,
            "CurrencyID": 61,
            "Currency": "ILS",
            "CountryCode": "+972"
        },
        {
            "Key": 10032,
            "Name": "Herzliya",
            "FullName": "Herzliya, Israel",
            "Lat": 32.17,
            "Long": 34.83,
            "CurrencyID": 61,
            "Currency": "ILS",
            "CountryCode": "+972"
        },
        {
            "Key": 10033,
            "Name": "Jerusalem",
            "FullName": "Jerusalem, Israel",
            "Lat": 31.78,
            "Long": 35.22,
            "CurrencyID": 61,
            "Currency": "ILS",
            "CountryCode": "+972"
        },
        {
            "Key": 10034,
            "Name": "Netanya",
            "FullName": "Netanya, Israel",
            "Lat": 32.33,
            "Long": 34.85,
            "CurrencyID": 61,
            "Currency": "ILS",
            "CountryCode": "+972"
        },
        {
            "Key": 10035,
            "Name": "Ramat Gan",
            "FullName": "Ramat Gan, Israel",
            "Lat": 32.08,
            "Long": 34.82,
            "CurrencyID": 61,
            "Currency": "ILS",
            "CountryCode": "+972"
        },
        {
            "Key": 10036,
            "Name": "Tel Aviv",
            "FullName": "Tel Aviv, Israel",
            "Lat": 32.07,
            "Long": 34.8,
            "CurrencyID": 61,
            "Currency": "ILS",
            "CountryCode": "+972"
        },
        {
            "Key": 9899,
            "Name": "Amritsar",
            "FullName": "Amritsar, India",
            "Lat": 31.64,
            "Long": 74.86,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9900,
            "Name": "Asansol",
            "FullName": "Asansol, India",
            "Lat": 23.68,
            "Long": 86.99,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9901,
            "Name": "Aurangabad",
            "FullName": "Aurangabad, India",
            "Lat": 19.88,
            "Long": 75.32,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9902,
            "Name": "Bangalore",
            "FullName": "Bangalore, India",
            "Lat": 12.97,
            "Long": 77.57,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9903,
            "Name": "Bareilly",
            "FullName": "Bareilly, India",
            "Lat": 28.36,
            "Long": 79.42,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9904,
            "Name": "Belgaum",
            "FullName": "Belgaum, India",
            "Lat": 15.85,
            "Long": 74.5,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9905,
            "Name": "Bhavnagar",
            "FullName": "Bhavnagar, India",
            "Lat": 21.76,
            "Long": 72.15,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9906,
            "Name": "Bhilai",
            "FullName": "Bhilai, India",
            "Lat": 21.21,
            "Long": 81.38,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9907,
            "Name": "Bhiwandi",
            "FullName": "Bhiwandi, India",
            "Lat": 19.3,
            "Long": 73.06,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9908,
            "Name": "Bhopal",
            "FullName": "Bhopal, India",
            "Lat": 23.25,
            "Long": 77.42,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9909,
            "Name": "Bhubaneswar",
            "FullName": "Bhubaneswar, India",
            "Lat": 20.27,
            "Long": 85.84,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9910,
            "Name": "Bikaner",
            "FullName": "Bikaner, India",
            "Lat": 28.02,
            "Long": 73.31,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9911,
            "Name": "Chandigarh",
            "FullName": "Chandigarh, India",
            "Lat": 30.75,
            "Long": 76.78,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9912,
            "Name": "Chennai",
            "FullName": "Chennai, India",
            "Lat": 13.08,
            "Long": 80.27,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9913,
            "Name": "Coimbatore",
            "FullName": "Coimbatore, India",
            "Lat": 11.02,
            "Long": 76.97,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9914,
            "Name": "Connaught Place",
            "FullName": "Connaught Place, India",
            "Lat": 28.63,
            "Long": 77.22,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9915,
            "Name": "Cuttack",
            "FullName": "Cuttack, India",
            "Lat": 20.27,
            "Long": 85.52,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9916,
            "Name": "Dehradun",
            "FullName": "Dehradun, India",
            "Lat": 30.32,
            "Long": 78.03,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9917,
            "Name": "New Delhi",
            "FullName": "New Delhi, India",
            "Lat": 28.61,
            "Long": 77.23,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9919,
            "Name": "Dhanbad",
            "FullName": "Dhanbad, India",
            "Lat": 23.8,
            "Long": 86.45,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9920,
            "Name": "Durgapur",
            "FullName": "Durgapur, India",
            "Lat": 23.55,
            "Long": 87.32,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9921,
            "Name": "Faridabad",
            "FullName": "Faridabad, India",
            "Lat": 28.42,
            "Long": 77.31,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9922,
            "Name": "Firozabad",
            "FullName": "Firozabad, India",
            "Lat": 27.15,
            "Long": 78.42,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9923,
            "Name": "Gaya",
            "FullName": "Gaya, India",
            "Lat": 24.75,
            "Long": 85.01,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9924,
            "Name": "Ghaziabad",
            "FullName": "Ghaziabad, India",
            "Lat": 28.67,
            "Long": 77.42,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9925,
            "Name": "Gorakhpur",
            "FullName": "Gorakhpur, India",
            "Lat": 26.76,
            "Long": 83.37,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9926,
            "Name": "Gulbarga",
            "FullName": "Gulbarga, India",
            "Lat": 17.33,
            "Long": 76.83,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9927,
            "Name": "Guntur",
            "FullName": "Guntur, India",
            "Lat": 16.3,
            "Long": 80.44,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9928,
            "Name": "Gurgaon",
            "FullName": "Gurgaon, India",
            "Lat": 28.47,
            "Long": 77.03,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9929,
            "Name": "Guwahati",
            "FullName": "Guwahati, India",
            "Lat": 26.18,
            "Long": 91.73,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9930,
            "Name": "Gwalior",
            "FullName": "Gwalior, India",
            "Lat": 26.22,
            "Long": 78.18,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9931,
            "Name": "Howrah",
            "FullName": "Howrah, India",
            "Lat": 22.59,
            "Long": 88.31,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9932,
            "Name": "Hubballi Dharwad",
            "FullName": "Hubballi Dharwad, India",
            "Lat": 15.36,
            "Long": 75.08,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9933,
            "Name": "Hyderabad",
            "FullName": "Hyderabad, India",
            "Lat": 17.37,
            "Long": 78.48,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9934,
            "Name": "Indore",
            "FullName": "Indore, India",
            "Lat": 22.7,
            "Long": 75.9,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9935,
            "Name": "Jabalpur",
            "FullName": "Jabalpur, India",
            "Lat": 23.17,
            "Long": 79.93,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9936,
            "Name": "Jaipur",
            "FullName": "Jaipur, India",
            "Lat": 26.9,
            "Long": 75.8,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9937,
            "Name": "Jalandhar",
            "FullName": "Jalandhar, India",
            "Lat": 31.33,
            "Long": 75.58,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9938,
            "Name": "Jalgaon",
            "FullName": "Jalgaon, India",
            "Lat": 21,
            "Long": 75.57,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9939,
            "Name": "Jammu",
            "FullName": "Jammu, India",
            "Lat": 33.45,
            "Long": 76.24,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9940,
            "Name": "Jamnagar",
            "FullName": "Jamnagar, India",
            "Lat": 22.47,
            "Long": 70.07,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9941,
            "Name": "Jamshedpur",
            "FullName": "Jamshedpur, India",
            "Lat": 22.8,
            "Long": 86.3,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9942,
            "Name": "Jhansi",
            "FullName": "Jhansi, India",
            "Lat": 25.45,
            "Long": 78.57,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9943,
            "Name": "Jodhpur",
            "FullName": "Jodhpur, India",
            "Lat": 26.28,
            "Long": 73.02,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9944,
            "Name": "Kalyan",
            "FullName": "Kalyan, India",
            "Lat": 19.23,
            "Long": 73.13,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9945,
            "Name": "Kanpur",
            "FullName": "Kanpur, India",
            "Lat": 26.5,
            "Long": 80.3,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9946,
            "Name": "Karnataka",
            "FullName": "Karnataka, India",
            "Lat": 12.97,
            "Long": 77.56,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9947,
            "Name": "Kochi",
            "FullName": "Kochi, India",
            "Lat": 9.97,
            "Long": 76.28,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9948,
            "Name": "Kolhapur",
            "FullName": "Kolhapur, India",
            "Lat": 16.69,
            "Long": 74.23,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9949,
            "Name": "Kolkata",
            "FullName": "Kolkata, India",
            "Lat": 22.57,
            "Long": 88.37,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9950,
            "Name": "Kota",
            "FullName": "Kota, India",
            "Lat": 25.18,
            "Long": 75.83,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9951,
            "Name": "Loni",
            "FullName": "Loni, India",
            "Lat": 28.75,
            "Long": 77.28,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9952,
            "Name": "Lucknow",
            "FullName": "Lucknow, India",
            "Lat": 26.8,
            "Long": 80.9,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9953,
            "Name": "Ludhiana",
            "FullName": "Ludhiana, India",
            "Lat": 30.91,
            "Long": 75.85,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9954,
            "Name": "Madurai",
            "FullName": "Madurai, India",
            "Lat": 9.9,
            "Long": 78.1,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9955,
            "Name": "Maheshtala",
            "FullName": "Maheshtala, India",
            "Lat": 22.29,
            "Long": 88.11,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9956,
            "Name": "Malegaon",
            "FullName": "Malegaon, India",
            "Lat": 20.55,
            "Long": 74.55,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9957,
            "Name": "Mangalore",
            "FullName": "Mangalore, India",
            "Lat": 12.87,
            "Long": 74.88,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9958,
            "Name": "Meerut",
            "FullName": "Meerut, India",
            "Lat": 28.99,
            "Long": 77.7,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9960,
            "Name": "Moradabad",
            "FullName": "Moradabad, India",
            "Lat": 28.83,
            "Long": 78.78,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9961,
            "Name": "Mumbai",
            "FullName": "Mumbai, India",
            "Lat": 18.98,
            "Long": 72.83,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9962,
            "Name": "Mysore",
            "FullName": "Mysore, India",
            "Lat": 12.3,
            "Long": 76.65,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9963,
            "Name": "Nagpur",
            "FullName": "Nagpur, India",
            "Lat": 21.15,
            "Long": 79.09,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9964,
            "Name": "Nanded",
            "FullName": "Nanded, India",
            "Lat": 19.15,
            "Long": 77.3,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9965,
            "Name": "Nashik",
            "FullName": "Nashik, India",
            "Lat": 20,
            "Long": 73.78,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9966,
            "Name": "Navi Mumbai",
            "FullName": "Navi Mumbai, India",
            "Lat": 19.02,
            "Long": 73.02,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9967,
            "Name": "Nellore",
            "FullName": "Nellore, India",
            "Lat": 14.43,
            "Long": 79.97,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9968,
            "Name": "Noida",
            "FullName": "Noida, India",
            "Lat": 28.59,
            "Long": 77.34,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9969,
            "Name": "Noida, Uttar Pradesh",
            "FullName": "Noida, Uttar Pradesh, India",
            "Lat": 28.57,
            "Long": 77.32,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9970,
            "Name": "Palakkad",
            "FullName": "Palakkad, India",
            "Lat": 10.77,
            "Long": 76.65,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9971,
            "Name": "Patna",
            "FullName": "Patna, India",
            "Lat": 25.6,
            "Long": 85.1,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9973,
            "Name": "Pune",
            "FullName": "Pune, India",
            "Lat": 18.52,
            "Long": 73.86,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9974,
            "Name": "Raipur",
            "FullName": "Raipur, India",
            "Lat": 21.14,
            "Long": 81.38,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9975,
            "Name": "Rajkot",
            "FullName": "Rajkot, India",
            "Lat": 22.3,
            "Long": 70.78,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9976,
            "Name": "Ranchi",
            "FullName": "Ranchi, India",
            "Lat": 23.35,
            "Long": 85.33,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9977,
            "Name": "Saharanpur",
            "FullName": "Saharanpur, India",
            "Lat": 29.96,
            "Long": 77.55,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9978,
            "Name": "Salem",
            "FullName": "Salem, India",
            "Lat": 11.65,
            "Long": 78.16,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9979,
            "Name": "Sangli Miraj Kupwad",
            "FullName": "Sangli Miraj Kupwad, India",
            "Lat": 16.83,
            "Long": 74.65,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9980,
            "Name": "Siliguri",
            "FullName": "Siliguri, India",
            "Lat": 26.71,
            "Long": 88.43,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9981,
            "Name": "Solapur",
            "FullName": "Solapur, India",
            "Lat": 17.68,
            "Long": 75.92,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9982,
            "Name": "Srinagar",
            "FullName": "Srinagar, India",
            "Lat": 34.09,
            "Long": 74.79,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9983,
            "Name": "Surat",
            "FullName": "Surat, India",
            "Lat": 21.17,
            "Long": 72.83,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9984,
            "Name": "Thane",
            "FullName": "Thane, India",
            "Lat": 19.17,
            "Long": 72.96,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9985,
            "Name": "Thiruvananthapuram",
            "FullName": "Thiruvananthapuram, India",
            "Lat": 8.49,
            "Long": 76.95,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9986,
            "Name": "Tiruchirappalli",
            "FullName": "Tiruchirappalli, India",
            "Lat": 10.8,
            "Long": 78.69,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9987,
            "Name": "Tirunelveli",
            "FullName": "Tirunelveli, India",
            "Lat": 8.73,
            "Long": 77.7,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9988,
            "Name": "Udaipur",
            "FullName": "Udaipur, India",
            "Lat": 24.58,
            "Long": 73.68,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9989,
            "Name": "Ujjain",
            "FullName": "Ujjain, India",
            "Lat": 23.18,
            "Long": 75.78,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9990,
            "Name": "Ulhasnagar",
            "FullName": "Ulhasnagar, India",
            "Lat": 19.22,
            "Long": 73.15,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9991,
            "Name": "Vadodara",
            "FullName": "Vadodara, India",
            "Lat": 22.3,
            "Long": 73.2,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9992,
            "Name": "Varanasi",
            "FullName": "Varanasi, India",
            "Lat": 25.28,
            "Long": 82.96,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9993,
            "Name": "Vasai Virar",
            "FullName": "Vasai Virar, India",
            "Lat": 19.47,
            "Long": 72.8,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9994,
            "Name": "Vijayawada",
            "FullName": "Vijayawada, India",
            "Lat": 16.51,
            "Long": 80.64,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9995,
            "Name": "Visakhapatnam",
            "FullName": "Visakhapatnam, India",
            "Lat": 17.69,
            "Long": 83.22,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9996,
            "Name": "Warangal",
            "FullName": "Warangal, India",
            "Lat": 18,
            "Long": 79.58,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9997,
            "Name": "Agra",
            "FullName": "Agra, India",
            "Lat": 27.18,
            "Long": 78.02,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9998,
            "Name": "Ahmedabad",
            "FullName": "Ahmedabad, India",
            "Lat": 23.03,
            "Long": 72.58,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 9999,
            "Name": "Ajmer",
            "FullName": "Ajmer, India",
            "Lat": 26.45,
            "Long": 74.64,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 10000,
            "Name": "Aligarh",
            "FullName": "Aligarh, India",
            "Lat": 27.88,
            "Long": 78.08,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 10001,
            "Name": "Allahabad",
            "FullName": "Allahabad, India",
            "Lat": 25.45,
            "Long": 81.85,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 10002,
            "Name": "Ambattur",
            "FullName": "Ambattur, India",
            "Lat": 13.1,
            "Long": 80.16,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 10003,
            "Name": "Amravati",
            "FullName": "Amravati, India",
            "Lat": 20.93,
            "Long": 77.76,
            "CurrencyID": 62,
            "Currency": "INR",
            "CountryCode": "+91"
        },
        {
            "Key": 10025,
            "Name": "Mashhad",
            "FullName": "Mashhad, Iran",
            "Lat": 36.3,
            "Long": 59.6,
            "CurrencyID": 63,
            "Currency": "IRR",
            "CountryCode": "+98"
        },
        {
            "Key": 10026,
            "Name": "Tehran",
            "FullName": "Tehran, Iran",
            "Lat": 35.7,
            "Long": 51.42,
            "CurrencyID": 63,
            "Currency": "IRR",
            "CountryCode": "+98"
        },
        {
            "Key": 9898,
            "Name": "Reykjavik",
            "FullName": "Reykjavik, Iceland",
            "Lat": 64.13,
            "Long": -21.93,
            "CurrencyID": 64,
            "Currency": "ISK",
            "CountryCode": "+354"
        },
        {
            "Key": 10088,
            "Name": "Kingston",
            "FullName": "Kingston, Jamaica",
            "Lat": 17.98,
            "Long": -76.8,
            "CurrencyID": 65,
            "Currency": "JMD",
            "CountryCode": "+1"
        },
        {
            "Key": 10122,
            "Name": "Amman",
            "FullName": "Amman, Jordan",
            "Lat": 31.95,
            "Long": 35.93,
            "CurrencyID": 66,
            "Currency": "JOD",
            "CountryCode": "+962"
        },
        {
            "Key": 10089,
            "Name": "Chiba",
            "FullName": "Chiba, Japan",
            "Lat": 35.6,
            "Long": 140.12,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10090,
            "Name": "Fukuoka",
            "FullName": "Fukuoka, Japan",
            "Lat": 33.58,
            "Long": 130.4,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10091,
            "Name": "Funabashi",
            "FullName": "Funabashi, Japan",
            "Lat": 35.69,
            "Long": 139.98,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10092,
            "Name": "Hachioji",
            "FullName": "Hachioji, Japan",
            "Lat": 35.66,
            "Long": 139.32,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10093,
            "Name": "Hamamatsu",
            "FullName": "Hamamatsu, Japan",
            "Lat": 34.71,
            "Long": 137.73,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10094,
            "Name": "Higashiosaka",
            "FullName": "Higashiosaka, Japan",
            "Lat": 34.68,
            "Long": 135.6,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10095,
            "Name": "Himeji",
            "FullName": "Himeji, Japan",
            "Lat": 34.82,
            "Long": 134.69,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10096,
            "Name": "Hiroshima",
            "FullName": "Hiroshima, Japan",
            "Lat": 34.39,
            "Long": 132.46,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10097,
            "Name": "Kagoshima",
            "FullName": "Kagoshima, Japan",
            "Lat": 31.6,
            "Long": 130.55,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10098,
            "Name": "Kanagawa Ward",
            "FullName": "Kanagawa Ward, Japan",
            "Lat": 35.44,
            "Long": 139.64,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10099,
            "Name": "Kawaguchi",
            "FullName": "Kawaguchi, Japan",
            "Lat": 35.81,
            "Long": 139.71,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10100,
            "Name": "Kawasaki",
            "FullName": "Kawasaki, Japan",
            "Lat": 33.6,
            "Long": 130.81,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10101,
            "Name": "Kitakyushu",
            "FullName": "Kitakyushu, Japan",
            "Lat": 33.88,
            "Long": 130.88,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10102,
            "Name": "Kobe",
            "FullName": "Kobe, Japan",
            "Lat": 34.69,
            "Long": 135.2,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10103,
            "Name": "Kumamoto",
            "FullName": "Kumamoto, Japan",
            "Lat": 32.78,
            "Long": 130.73,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10104,
            "Name": "Kurashiki",
            "FullName": "Kurashiki, Japan",
            "Lat": 34.58,
            "Long": 133.77,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10105,
            "Name": "Kyoto",
            "FullName": "Kyoto, Japan",
            "Lat": 35.01,
            "Long": 135.77,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10106,
            "Name": "Matsudo",
            "FullName": "Matsudo, Japan",
            "Lat": 35.78,
            "Long": 139.9,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10107,
            "Name": "Matsuyama",
            "FullName": "Matsuyama, Japan",
            "Lat": 33.84,
            "Long": 132.77,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10108,
            "Name": "Nagoya",
            "FullName": "Nagoya, Japan",
            "Lat": 35.18,
            "Long": 136.9,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10109,
            "Name": "Niigata",
            "FullName": "Niigata, Japan",
            "Lat": 37.92,
            "Long": 139.04,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10110,
            "Name": "Nishinomiya",
            "FullName": "Nishinomiya, Japan",
            "Lat": 34.74,
            "Long": 135.34,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10111,
            "Name": "Okayama",
            "FullName": "Okayama, Japan",
            "Lat": 34.66,
            "Long": 133.94,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10112,
            "Name": "Osaka",
            "FullName": "Osaka, Japan",
            "Lat": 34.69,
            "Long": 135.5,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10113,
            "Name": "Sagamihara",
            "FullName": "Sagamihara, Japan",
            "Lat": 35.57,
            "Long": 139.37,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10114,
            "Name": "Saitama",
            "FullName": "Saitama, Japan",
            "Lat": 35.87,
            "Long": 139.65,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10115,
            "Name": "Sakai",
            "FullName": "Sakai, Japan",
            "Lat": 34.58,
            "Long": 135.47,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10116,
            "Name": "Sapporo",
            "FullName": "Sapporo, Japan",
            "Lat": 43.07,
            "Long": 141.35,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10117,
            "Name": "Sendai",
            "FullName": "Sendai, Japan",
            "Lat": 38.27,
            "Long": 140.87,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10118,
            "Name": "Shizuoka",
            "FullName": "Shizuoka, Japan",
            "Lat": 34.98,
            "Long": 138.38,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10119,
            "Name": "Tokyo",
            "FullName": "Tokyo, Japan",
            "Lat": 35.68,
            "Long": 139.68,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10120,
            "Name": "Utsunomiya",
            "FullName": "Utsunomiya, Japan",
            "Lat": 36.55,
            "Long": 139.88,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10121,
            "Name": "Yokohama",
            "FullName": "Yokohama, Japan",
            "Lat": 35.44,
            "Long": 139.64,
            "CurrencyID": 67,
            "Currency": "JPY",
            "CountryCode": "+81"
        },
        {
            "Key": 10125,
            "Name": "Kisumu",
            "FullName": "Kisumu, Kenya",
            "Lat": -0.1,
            "Long": 34.75,
            "CurrencyID": 68,
            "Currency": "KES",
            "CountryCode": "+254"
        },
        {
            "Key": 10126,
            "Name": "Nairobi",
            "FullName": "Nairobi, Kenya",
            "Lat": -1.28,
            "Long": 36.82,
            "CurrencyID": 68,
            "Currency": "KES",
            "CountryCode": "+254"
        },
        {
            "Key": 10128,
            "Name": "Bishkek",
            "FullName": "Bishkek, Kyrgyzstan",
            "Lat": 42.87,
            "Long": 74.61,
            "CurrencyID": 69,
            "Currency": "KGS",
            "CountryCode": "+996"
        },
        {
            "Key": 9459,
            "Name": "Kandal",
            "FullName": "Kandal, Cambodia",
            "Lat": 13.86,
            "Long": 100.51,
            "CurrencyID": 70,
            "Currency": "KHR",
            "CountryCode": "+855"
        },
        {
            "Key": 9460,
            "Name": "Krong Siem Reap",
            "FullName": "Krong Siem Reap, Cambodia",
            "Lat": 13.36,
            "Long": 103.86,
            "CurrencyID": 70,
            "Currency": "KHR",
            "CountryCode": "+855"
        },
        {
            "Key": 9461,
            "Name": "Phnom Penh",
            "FullName": "Phnom Penh, Cambodia",
            "Lat": 11.55,
            "Long": 104.92,
            "CurrencyID": 70,
            "Currency": "KHR",
            "CountryCode": "+855"
        },
        {
            "Key": 10660,
            "Name": "Gyeonggi Do",
            "FullName": "Gyeonggi Do, South Korea",
            "Lat": 37.5,
            "Long": 127.25,
            "CurrencyID": 71,
            "Currency": "KRW",
            "CountryCode": "+82"
        },
        {
            "Key": 10661,
            "Name": "Incheon",
            "FullName": "Incheon, South Korea",
            "Lat": 37.48,
            "Long": 126.63,
            "CurrencyID": 71,
            "Currency": "KRW",
            "CountryCode": "+82"
        },
        {
            "Key": 10662,
            "Name": "Seoul",
            "FullName": "Seoul, South Korea",
            "Lat": 37.57,
            "Long": 126.97,
            "CurrencyID": 71,
            "Currency": "KRW",
            "CountryCode": "+82"
        },
        {
            "Key": 10127,
            "Name": "Madinat Al Kuwait",
            "FullName": "Madinat Al Kuwait, Kuwait",
            "Lat": 29.37,
            "Long": 47.98,
            "CurrencyID": 72,
            "Currency": "KWD",
            "CountryCode": "+965"
        },
        {
            "Key": 9510,
            "Name": "George Town",
            "FullName": "George Town, Cayman Islands",
            "Lat": 19.3,
            "Long": -81.39,
            "CurrencyID": 73,
            "Currency": "KYD",
            "CountryCode": "+1"
        },
        {
            "Key": 9511,
            "Name": "West Bay",
            "FullName": "West Bay, Cayman Islands",
            "Lat": 19.34,
            "Long": -81.35,
            "CurrencyID": 73,
            "Currency": "KYD",
            "CountryCode": "+1"
        },
        {
            "Key": 10123,
            "Name": "Almaty",
            "FullName": "Almaty, Kazakhstan",
            "Lat": 43.28,
            "Long": 76.9,
            "CurrencyID": 74,
            "Currency": "KZT",
            "CountryCode": "+7"
        },
        {
            "Key": 10124,
            "Name": "Astana",
            "FullName": "Astana, Kazakhstan",
            "Lat": 51.17,
            "Long": 71.43,
            "CurrencyID": 74,
            "Currency": "KZT",
            "CountryCode": "+7"
        },
        {
            "Key": 10130,
            "Name": "Beirut",
            "FullName": "Beirut, Lebanon",
            "Lat": 33.89,
            "Long": 35.51,
            "CurrencyID": 75,
            "Currency": "LBP",
            "CountryCode": "+961"
        },
        {
            "Key": 10689,
            "Name": "Colombo",
            "FullName": "Colombo, Sri Lanka",
            "Lat": 6.93,
            "Long": 79.84,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10690,
            "Name": "Galle",
            "FullName": "Galle, Sri Lanka",
            "Lat": 6.05,
            "Long": 80.21,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10691,
            "Name": "Kalutara",
            "FullName": "Kalutara, Sri Lanka",
            "Lat": 6.59,
            "Long": 79.96,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10692,
            "Name": "Kandy",
            "FullName": "Kandy, Sri Lanka",
            "Lat": 7.3,
            "Long": 80.64,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10693,
            "Name": "Matara",
            "FullName": "Matara, Sri Lanka",
            "Lat": 5.95,
            "Long": 80.53,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10694,
            "Name": "Panadura",
            "FullName": "Panadura, Sri Lanka",
            "Lat": 6.71,
            "Long": 79.9,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10695,
            "Name": "Wattala",
            "FullName": "Wattala, Sri Lanka",
            "Lat": 6.98,
            "Long": 79.88,
            "CurrencyID": 76,
            "Currency": "LKR",
            "CountryCode": "+94"
        },
        {
            "Key": 10131,
            "Name": "Monrovia",
            "FullName": "Monrovia, Liberia",
            "Lat": 6.31,
            "Long": -10.8,
            "CurrencyID": 77,
            "Currency": "LRD",
            "CountryCode": "+231"
        },
        {
            "Key": 10132,
            "Name": "Tripoli",
            "FullName": "Tripoli, Libya",
            "Lat": 32.9,
            "Long": 13.19,
            "CurrencyID": 78,
            "Currency": "LYD",
            "CountryCode": "+218"
        },
        {
            "Key": 10255,
            "Name": "Casablanca",
            "FullName": "Casablanca, Morocco",
            "Lat": 33.53,
            "Long": -7.58,
            "CurrencyID": 79,
            "Currency": "MAD",
            "CountryCode": "+212"
        },
        {
            "Key": 10256,
            "Name": "Fes",
            "FullName": "Fes, Morocco",
            "Lat": 34.03,
            "Long": -5,
            "CurrencyID": 79,
            "Currency": "MAD",
            "CountryCode": "+212"
        },
        {
            "Key": 10257,
            "Name": "Marrakech",
            "FullName": "Marrakech, Morocco",
            "Lat": 31.63,
            "Long": -8.01,
            "CurrencyID": 79,
            "Currency": "MAD",
            "CountryCode": "+212"
        },
        {
            "Key": 10258,
            "Name": "Nador",
            "FullName": "Nador, Morocco",
            "Lat": 35.17,
            "Long": -2.93,
            "CurrencyID": 79,
            "Currency": "MAD",
            "CountryCode": "+212"
        },
        {
            "Key": 10259,
            "Name": "Rabat",
            "FullName": "Rabat, Morocco",
            "Lat": 34.02,
            "Long": -6.84,
            "CurrencyID": 79,
            "Currency": "MAD",
            "CountryCode": "+212"
        },
        {
            "Key": 10260,
            "Name": "Tangier",
            "FullName": "Tangier, Morocco",
            "Lat": 35.77,
            "Long": -5.8,
            "CurrencyID": 79,
            "Currency": "MAD",
            "CountryCode": "+212"
        },
        {
            "Key": 10253,
            "Name": "Chisinau",
            "FullName": "Chisinau, Moldova",
            "Lat": 47,
            "Long": 28.92,
            "CurrencyID": 80,
            "Currency": "MDL",
            "CountryCode": "+373"
        },
        {
            "Key": 10137,
            "Name": "Antananarivo",
            "FullName": "Antananarivo, Madagascar",
            "Lat": -18.93,
            "Long": 47.52,
            "CurrencyID": 81,
            "Currency": "MGA",
            "CountryCode": "+261"
        },
        {
            "Key": 10136,
            "Name": "Skopje",
            "FullName": "Skopje, Macedonia",
            "Lat": 42,
            "Long": 21.43,
            "CurrencyID": 82,
            "Currency": "MKD",
            "CountryCode": "+389"
        },
        {
            "Key": 10262,
            "Name": "Mandalay",
            "FullName": "Mandalay, Myanmar",
            "Lat": 21.98,
            "Long": 96.08,
            "CurrencyID": 83,
            "Currency": "MMK",
            "CountryCode": "+95"
        },
        {
            "Key": 10263,
            "Name": "Naypyidaw",
            "FullName": "Naypyidaw, Myanmar",
            "Lat": 19.75,
            "Long": 96.1,
            "CurrencyID": 83,
            "Currency": "MMK",
            "CountryCode": "+95"
        },
        {
            "Key": 10264,
            "Name": "Yangon",
            "FullName": "Yangon, Myanmar",
            "Lat": 16.8,
            "Long": 96.15,
            "CurrencyID": 83,
            "Currency": "MMK",
            "CountryCode": "+95"
        },
        {
            "Key": 10150,
            "Name": "Nouakchott",
            "FullName": "Nouakchott, Mauritania",
            "Lat": 18.1,
            "Long": -15.95,
            "CurrencyID": 84,
            "Currency": "MRO",
            "CountryCode": "+222"
        },
        {
            "Key": 10151,
            "Name": "Port Louis",
            "FullName": "Port Louis, Mauritius",
            "Lat": -20.16,
            "Long": 57.5,
            "CurrencyID": 85,
            "Currency": "MUR",
            "CountryCode": "+230"
        },
        {
            "Key": 10147,
            "Name": "Male",
            "FullName": "Male, Maldives",
            "Lat": 4.18,
            "Long": 73.51,
            "CurrencyID": 86,
            "Currency": "MVR",
            "CountryCode": "+960"
        },
        {
            "Key": 10152,
            "Name": "Acapulco",
            "FullName": "Acapulco, Mexico",
            "Lat": 16.86,
            "Long": -99.88,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10153,
            "Name": "Aguascalientes",
            "FullName": "Aguascalientes, Mexico",
            "Lat": 21.88,
            "Long": -102.3,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10154,
            "Name": "Buenavista",
            "FullName": "Buenavista, Mexico",
            "Lat": 18.88,
            "Long": -88.24,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10155,
            "Name": "Campeche",
            "FullName": "Campeche, Mexico",
            "Lat": 18.83,
            "Long": -90.4,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10156,
            "Name": "Cancun",
            "FullName": "Cancun, Mexico",
            "Lat": 21.16,
            "Long": -86.85,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10157,
            "Name": "Celaya",
            "FullName": "Celaya, Mexico",
            "Lat": 20.52,
            "Long": -100.81,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10158,
            "Name": "Chalco De Diaz Covarrubias",
            "FullName": "Chalco De Diaz Covarrubias, Mexico",
            "Lat": 19.26,
            "Long": -98.9,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10159,
            "Name": "Chapala",
            "FullName": "Chapala, Mexico",
            "Lat": 20.3,
            "Long": -103.19,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10160,
            "Name": "Chetumal",
            "FullName": "Chetumal, Mexico",
            "Lat": 18.5,
            "Long": -88.31,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10161,
            "Name": "Chicoloapan De Juarez",
            "FullName": "Chicoloapan De Juarez, Mexico",
            "Lat": 19.42,
            "Long": -98.9,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10162,
            "Name": "Chihuahua",
            "FullName": "Chihuahua, Mexico",
            "Lat": 21.16,
            "Long": -86.85,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10163,
            "Name": "Chilpancingo",
            "FullName": "Chilpancingo, Mexico",
            "Lat": 17.55,
            "Long": -99.5,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10164,
            "Name": "Chimalhuacan",
            "FullName": "Chimalhuacan, Mexico",
            "Lat": 19.42,
            "Long": -98.9,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10165,
            "Name": "Ciudad Acuna",
            "FullName": "Ciudad Acuna, Mexico",
            "Lat": 29.32,
            "Long": -100.93,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10166,
            "Name": "Ciudad Apodaca",
            "FullName": "Ciudad Apodaca, Mexico",
            "Lat": 25.78,
            "Long": -100.18,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10167,
            "Name": "Ciudad Benito Juarez",
            "FullName": "Ciudad Benito Juarez, Mexico",
            "Lat": 19.44,
            "Long": -99.07,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10168,
            "Name": "Ciudad Del Carmen",
            "FullName": "Ciudad Del Carmen, Mexico",
            "Lat": 18.63,
            "Long": -91.83,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10169,
            "Name": "Ciudad Lopez Mateos",
            "FullName": "Ciudad Lopez Mateos, Mexico",
            "Lat": 19.55,
            "Long": -99.28,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10170,
            "Name": "Ciudad Madero",
            "FullName": "Ciudad Madero, Mexico",
            "Lat": 22.25,
            "Long": -97.83,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10171,
            "Name": "Ciudad Nicolas Romero",
            "FullName": "Ciudad Nicolas Romero, Mexico",
            "Lat": 19.58,
            "Long": -99.37,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10172,
            "Name": "Ciudad Obregon",
            "FullName": "Ciudad Obregon, Mexico",
            "Lat": 27.49,
            "Long": -109.94,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10173,
            "Name": "Ciudad Valles",
            "FullName": "Ciudad Valles, Mexico",
            "Lat": 22,
            "Long": -99.02,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10174,
            "Name": "Ciudad Victoria",
            "FullName": "Ciudad Victoria, Mexico",
            "Lat": 23.73,
            "Long": -99.13,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10175,
            "Name": "Coacalco De Berriozabal",
            "FullName": "Coacalco De Berriozabal, Mexico",
            "Lat": 19.63,
            "Long": -99.09,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10176,
            "Name": "Coatzacoalcos",
            "FullName": "Coatzacoalcos, Mexico",
            "Lat": 18.15,
            "Long": -94.43,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10177,
            "Name": "Colima",
            "FullName": "Colima, Mexico",
            "Lat": 19.51,
            "Long": -103.62,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10178,
            "Name": "Cordoba",
            "FullName": "Cordoba, Mexico",
            "Lat": 18.89,
            "Long": -96.93,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10179,
            "Name": "Cuautitlan Izcalli",
            "FullName": "Cuautitlan Izcalli, Mexico",
            "Lat": 19.65,
            "Long": -99.25,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10180,
            "Name": "Cuautla",
            "FullName": "Cuautla, Mexico",
            "Lat": 18.8,
            "Long": -98.95,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10181,
            "Name": "Cuernavaca",
            "FullName": "Cuernavaca, Mexico",
            "Lat": 18.92,
            "Long": -99.23,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10182,
            "Name": "Culiacan",
            "FullName": "Culiacan, Mexico",
            "Lat": 24.8,
            "Long": -107.38,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10183,
            "Name": "Durango",
            "FullName": "Durango, Mexico",
            "Lat": 24.93,
            "Long": -104.92,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10184,
            "Name": "Ecatepec",
            "FullName": "Ecatepec, Mexico",
            "Lat": 19.61,
            "Long": -99.06,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10185,
            "Name": "Ensenada",
            "FullName": "Ensenada, Mexico",
            "Lat": 31.86,
            "Long": -116.61,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10186,
            "Name": "General Escobedo",
            "FullName": "General Escobedo, Mexico",
            "Lat": 25.79,
            "Long": -100.16,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10187,
            "Name": "Gomez Palacio",
            "FullName": "Gomez Palacio, Mexico",
            "Lat": 25.56,
            "Long": -103.5,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10188,
            "Name": "Guadalajara",
            "FullName": "Guadalajara, Mexico",
            "Lat": 20.67,
            "Long": -103.35,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10190,
            "Name": "Guadalupe",
            "FullName": "Guadalupe, Mexico",
            "Lat": 25.68,
            "Long": -100.26,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10191,
            "Name": "Hermosillo",
            "FullName": "Hermosillo, Mexico",
            "Lat": 29.1,
            "Long": -110.95,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10192,
            "Name": "Irapuato",
            "FullName": "Irapuato, Mexico",
            "Lat": 20.67,
            "Long": -101.35,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10193,
            "Name": "Ixtapaluca",
            "FullName": "Ixtapaluca, Mexico",
            "Lat": 19.32,
            "Long": -98.88,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10194,
            "Name": "Jiutepec",
            "FullName": "Jiutepec, Mexico",
            "Lat": 18.88,
            "Long": -99.18,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10195,
            "Name": "Juarez",
            "FullName": "Juarez, Mexico",
            "Lat": 31.74,
            "Long": -106.49,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10196,
            "Name": "La Paz",
            "FullName": "La Paz, Mexico",
            "Lat": 24.14,
            "Long": -110.31,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10197,
            "Name": "Leon",
            "FullName": "Leon, Mexico",
            "Lat": 21.12,
            "Long": -101.68,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10198,
            "Name": "Los Mochis",
            "FullName": "Los Mochis, Mexico",
            "Lat": 25.78,
            "Long": -108.99,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10199,
            "Name": "Manzanillo",
            "FullName": "Manzanillo, Mexico",
            "Lat": 19.05,
            "Long": -104.32,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10200,
            "Name": "Matamoros",
            "FullName": "Matamoros, Mexico",
            "Lat": 25.88,
            "Long": -97.5,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10201,
            "Name": "Mazatlan",
            "FullName": "Mazatlan, Mexico",
            "Lat": 23.22,
            "Long": -106.42,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10202,
            "Name": "Merida",
            "FullName": "Merida, Mexico",
            "Lat": 20.97,
            "Long": -89.62,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10203,
            "Name": "Mexicali",
            "FullName": "Mexicali, Mexico",
            "Lat": 32.66,
            "Long": -115.47,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10204,
            "Name": "Mexico City",
            "FullName": "Mexico City, Mexico",
            "Lat": 19.43,
            "Long": -99.13,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10205,
            "Name": "Monclova",
            "FullName": "Monclova, Mexico",
            "Lat": 26.91,
            "Long": -101.42,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10206,
            "Name": "Monterrey",
            "FullName": "Monterrey, Mexico",
            "Lat": 25.67,
            "Long": -100.3,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10207,
            "Name": "Morelia",
            "FullName": "Morelia, Mexico",
            "Lat": 19.77,
            "Long": -101.19,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10208,
            "Name": "Naucalpan",
            "FullName": "Naucalpan, Mexico",
            "Lat": 19.48,
            "Long": -99.24,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10209,
            "Name": "Nezahualcoyotl",
            "FullName": "Nezahualcoyotl, Mexico",
            "Lat": 19.4,
            "Long": -98.99,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10210,
            "Name": "Nogales",
            "FullName": "Nogales, Mexico",
            "Lat": 31.32,
            "Long": -110.95,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10211,
            "Name": "Nuevo Laredo",
            "FullName": "Nuevo Laredo, Mexico",
            "Lat": 27.49,
            "Long": -99.51,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10212,
            "Name": "Oaxaca",
            "FullName": "Oaxaca, Mexico",
            "Lat": 16.9,
            "Long": -96.42,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10213,
            "Name": "Ojo De Agua",
            "FullName": "Ojo De Agua, Mexico",
            "Lat": 19.68,
            "Long": -99.01,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10214,
            "Name": "Pachuca",
            "FullName": "Pachuca, Mexico",
            "Lat": 20.1,
            "Long": -98.75,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10215,
            "Name": "Piedras Negras",
            "FullName": "Piedras Negras, Mexico",
            "Lat": 28.7,
            "Long": -100.52,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10216,
            "Name": "Playa Del Carmen",
            "FullName": "Playa Del Carmen, Mexico",
            "Lat": 20.63,
            "Long": -87.08,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10217,
            "Name": "Poza Rica",
            "FullName": "Poza Rica, Mexico",
            "Lat": 20.53,
            "Long": -97.45,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10218,
            "Name": "Puebla",
            "FullName": "Puebla, Mexico",
            "Lat": 19.03,
            "Long": -98.18,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10219,
            "Name": "Puerto Vallarta",
            "FullName": "Puerto Vallarta, Mexico",
            "Lat": 20.67,
            "Long": -105.27,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10220,
            "Name": "Queretaro",
            "FullName": "Queretaro, Mexico",
            "Lat": 20.59,
            "Long": -100.39,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10221,
            "Name": "Reynosa",
            "FullName": "Reynosa, Mexico",
            "Lat": 26.09,
            "Long": -98.28,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10222,
            "Name": "Rosarito",
            "FullName": "Rosarito, Mexico",
            "Lat": 32.34,
            "Long": -117.06,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10223,
            "Name": "Salamanca",
            "FullName": "Salamanca, Mexico",
            "Lat": 20.57,
            "Long": -101.2,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10224,
            "Name": "Saltillo",
            "FullName": "Saltillo, Mexico",
            "Lat": 25.43,
            "Long": -101,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10225,
            "Name": "San Cristobal De Las Casas",
            "FullName": "San Cristobal De Las Casas, Mexico",
            "Lat": 16.74,
            "Long": -92.64,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10226,
            "Name": "San Juan Del Rio",
            "FullName": "San Juan Del Rio, Mexico",
            "Lat": 20.38,
            "Long": -99.98,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10227,
            "Name": "San Luis Potosi",
            "FullName": "San Luis Potosi, Mexico",
            "Lat": 22.6,
            "Long": -100.43,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10228,
            "Name": "San Luis Rio Colorado",
            "FullName": "San Luis Rio Colorado, Mexico",
            "Lat": 32.48,
            "Long": -114.76,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10229,
            "Name": "San Nicolas De Los Garza",
            "FullName": "San Nicolas De Los Garza, Mexico",
            "Lat": 25.75,
            "Long": -100.28,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10230,
            "Name": "San Pablo De Las Salinas",
            "FullName": "San Pablo De Las Salinas, Mexico",
            "Lat": 19.67,
            "Long": -99.09,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10231,
            "Name": "San Pedro Garza Garcia",
            "FullName": "San Pedro Garza Garcia, Mexico",
            "Lat": 25.67,
            "Long": -100.3,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10232,
            "Name": "Santa Catarina",
            "FullName": "Santa Catarina, Mexico",
            "Lat": 20.14,
            "Long": -97.66,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10233,
            "Name": "Soledad De Graciano Sanchez",
            "FullName": "Soledad De Graciano Sanchez, Mexico",
            "Lat": 22.18,
            "Long": -100.93,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10234,
            "Name": "Tampico",
            "FullName": "Tampico, Mexico",
            "Lat": 22.26,
            "Long": -97.87,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10235,
            "Name": "Tapachula",
            "FullName": "Tapachula, Mexico",
            "Lat": 14.9,
            "Long": -92.27,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10236,
            "Name": "Tehuacan",
            "FullName": "Tehuacan, Mexico",
            "Lat": 18.47,
            "Long": -97.4,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10237,
            "Name": "Tepic",
            "FullName": "Tepic, Mexico",
            "Lat": 21.51,
            "Long": -104.9,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10238,
            "Name": "Tijuana",
            "FullName": "Tijuana, Mexico",
            "Lat": 32.52,
            "Long": -117.03,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10239,
            "Name": "Tlalnepantla",
            "FullName": "Tlalnepantla, Mexico",
            "Lat": 19.54,
            "Long": -99.19,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10240,
            "Name": "Tlaquepaque",
            "FullName": "Tlaquepaque, Mexico",
            "Lat": 20.65,
            "Long": -103.32,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10241,
            "Name": "Toluca",
            "FullName": "Toluca, Mexico",
            "Lat": 19.29,
            "Long": -99.66,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10242,
            "Name": "Tonala",
            "FullName": "Tonala, Mexico",
            "Lat": 20.62,
            "Long": -103.23,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10243,
            "Name": "Torreon",
            "FullName": "Torreon, Mexico",
            "Lat": 25.54,
            "Long": -103.45,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10244,
            "Name": "Tuxtla Gutierrez",
            "FullName": "Tuxtla Gutierrez, Mexico",
            "Lat": 16.75,
            "Long": -93.12,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10245,
            "Name": "Uruapan",
            "FullName": "Uruapan, Mexico",
            "Lat": 19.42,
            "Long": -102.06,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10246,
            "Name": "Veracruz",
            "FullName": "Veracruz, Mexico",
            "Lat": 19.19,
            "Long": -96.15,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10247,
            "Name": "Villahermosa",
            "FullName": "Villahermosa, Mexico",
            "Lat": 17.99,
            "Long": -92.93,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10248,
            "Name": "Xalapa",
            "FullName": "Xalapa, Mexico",
            "Lat": 19.54,
            "Long": -96.93,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10249,
            "Name": "Xico",
            "FullName": "Xico, Mexico",
            "Lat": 19.27,
            "Long": -98.93,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10250,
            "Name": "Zacatecas",
            "FullName": "Zacatecas, Mexico",
            "Lat": 23.3,
            "Long": -102.7,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10251,
            "Name": "Zamora",
            "FullName": "Zamora, Mexico",
            "Lat": 19.98,
            "Long": -102.28,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10252,
            "Name": "Zapopan",
            "FullName": "Zapopan, Mexico",
            "Lat": 20.72,
            "Long": -103.4,
            "CurrencyID": 87,
            "Currency": "MXN",
            "CountryCode": "+230"
        },
        {
            "Key": 10138,
            "Name": "Subang Jaya",
            "FullName": "Subang Jaya, Malaysia",
            "Lat": 3.06,
            "Long": 101.59,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10139,
            "Name": "Terengganu",
            "FullName": "Terengganu, Malaysia",
            "Lat": 4.75,
            "Long": 103,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10140,
            "Name": "Ampang",
            "FullName": "Ampang, Malaysia",
            "Lat": 3.16,
            "Long": 101.76,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10141,
            "Name": "George Town, Penang",
            "FullName": "George Town, Penang, Malaysia",
            "Lat": 5.42,
            "Long": 100.32,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10142,
            "Name": "Johor Bahru",
            "FullName": "Johor Bahru, Malaysia",
            "Lat": 1.48,
            "Long": 103.73,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10143,
            "Name": "Kajang",
            "FullName": "Kajang, Malaysia",
            "Lat": 2.99,
            "Long": 101.79,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10144,
            "Name": "Kelantan",
            "FullName": "Kelantan, Malaysia",
            "Lat": 5.25,
            "Long": 102,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10145,
            "Name": "Kuala Lumpur",
            "FullName": "Kuala Lumpur, Malaysia",
            "Lat": 3.13,
            "Long": 101.68,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10146,
            "Name": "Penang",
            "FullName": "Penang, Malaysia",
            "Lat": 5.4,
            "Long": 100.23,
            "CurrencyID": 88,
            "Currency": "MYR",
            "CountryCode": "+60"
        },
        {
            "Key": 10261,
            "Name": "Maputo",
            "FullName": "Maputo, Mozambique",
            "Lat": -25.97,
            "Long": 32.58,
            "CurrencyID": 89,
            "Currency": "MZN",
            "CountryCode": "+258"
        },
        {
            "Key": 10265,
            "Name": "Windhoek",
            "FullName": "Windhoek, Namibia",
            "Lat": -22.57,
            "Long": 17.08,
            "CurrencyID": 90,
            "Currency": "NAD",
            "CountryCode": "+264"
        },
        {
            "Key": 10311,
            "Name": "Abuja",
            "FullName": "Abuja, Nigeria",
            "Lat": 9.07,
            "Long": 7.48,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10312,
            "Name": "Akure",
            "FullName": "Akure, Nigeria",
            "Lat": 7.25,
            "Long": 5.2,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10313,
            "Name": "Benin",
            "FullName": "Benin, Nigeria",
            "Lat": 6.32,
            "Long": 5.61,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10314,
            "Name": "Benin City",
            "FullName": "Benin City, Nigeria",
            "Lat": 6.32,
            "Long": 5.61,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10315,
            "Name": "Calabar",
            "FullName": "Calabar, Nigeria",
            "Lat": 4.95,
            "Long": 8.32,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10316,
            "Name": "Delta",
            "FullName": "Delta, Nigeria",
            "Lat": 5.5,
            "Long": 6,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10317,
            "Name": "Edo",
            "FullName": "Edo, Nigeria",
            "Lat": 6.5,
            "Long": 6,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10318,
            "Name": "Enugu",
            "FullName": "Enugu, Nigeria",
            "Lat": 6.45,
            "Long": 7.51,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10319,
            "Name": "Ibadan",
            "FullName": "Ibadan, Nigeria",
            "Lat": 7.4,
            "Long": 3.92,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10320,
            "Name": "Ibeju Lekki",
            "FullName": "Ibeju Lekki, Nigeria",
            "Lat": 6.47,
            "Long": 3.58,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10321,
            "Name": "Ikeja",
            "FullName": "Ikeja, Nigeria",
            "Lat": 6.58,
            "Long": 3.33,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10322,
            "Name": "Ilorin",
            "FullName": "Ilorin, Nigeria",
            "Lat": 8.5,
            "Long": 4.55,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10323,
            "Name": "Imo",
            "FullName": "Imo, Nigeria",
            "Lat": 5.48,
            "Long": 7.03,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10324,
            "Name": "Kaduna",
            "FullName": "Kaduna, Nigeria",
            "Lat": 10.33,
            "Long": 7.75,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10325,
            "Name": "Kano",
            "FullName": "Kano, Nigeria",
            "Lat": 12,
            "Long": 8.52,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10326,
            "Name": "Lagos",
            "FullName": "Lagos, Nigeria",
            "Lat": 6.45,
            "Long": 3.4,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10327,
            "Name": "Maiduguri",
            "FullName": "Maiduguri, Nigeria",
            "Lat": 11.83,
            "Long": 13.15,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10328,
            "Name": "Ogbomosho",
            "FullName": "Ogbomosho, Nigeria",
            "Lat": 8.13,
            "Long": 4.25,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10329,
            "Name": "Ondo",
            "FullName": "Ondo, Nigeria",
            "Lat": 7.08,
            "Long": 4.83,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10330,
            "Name": "Osun",
            "FullName": "Osun, Nigeria",
            "Lat": 7.5,
            "Long": 4.5,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10331,
            "Name": "Port Harcourt",
            "FullName": "Port Harcourt, Nigeria",
            "Lat": 4.75,
            "Long": 7,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10332,
            "Name": "Warri",
            "FullName": "Warri, Nigeria",
            "Lat": 5.52,
            "Long": 5.75,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10333,
            "Name": "Zaria",
            "FullName": "Zaria, Nigeria",
            "Lat": 11.07,
            "Long": 7.7,
            "CurrencyID": 91,
            "Currency": "NGN",
            "CountryCode": "+234"
        },
        {
            "Key": 10308,
            "Name": "Leon",
            "FullName": "Leon, Nicaragua",
            "Lat": 12.43,
            "Long": 86.89,
            "CurrencyID": 92,
            "Currency": "NIO",
            "CountryCode": "+505"
        },
        {
            "Key": 10309,
            "Name": "Managua",
            "FullName": "Managua, Nicaragua",
            "Lat": 12.14,
            "Long": 86.25,
            "CurrencyID": 92,
            "Currency": "NIO",
            "CountryCode": "+505"
        },
        {
            "Key": 10334,
            "Name": "Bergen",
            "FullName": "Bergen, Norway",
            "Lat": 60.39,
            "Long": 5.33,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10335,
            "Name": "Drammen",
            "FullName": "Drammen, Norway",
            "Lat": 59.74,
            "Long": 10.21,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10336,
            "Name": "Gjovik",
            "FullName": "Gjovik, Norway",
            "Lat": 60.88,
            "Long": 10.52,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10337,
            "Name": "Lyngdal",
            "FullName": "Lyngdal, Norway",
            "Lat": 58.17,
            "Long": 7.06,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10338,
            "Name": "Oslo",
            "FullName": "Oslo, Norway",
            "Lat": 59.95,
            "Long": 10.75,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10339,
            "Name": "Stavanger",
            "FullName": "Stavanger, Norway",
            "Lat": 58.96,
            "Long": 5.72,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10340,
            "Name": "Trondheim",
            "FullName": "Trondheim, Norway",
            "Lat": 63.43,
            "Long": 10.39,
            "CurrencyID": 93,
            "Currency": "NOK",
            "CountryCode": "+47"
        },
        {
            "Key": 10266,
            "Name": "Kathmandu",
            "FullName": "Kathmandu, Nepal",
            "Lat": 27.7,
            "Long": 85.33,
            "CurrencyID": 94,
            "Currency": "NPR",
            "CountryCode": "+977"
        },
        {
            "Key": 10267,
            "Name": "Lalitpur",
            "FullName": "Lalitpur, Nepal",
            "Lat": 27.67,
            "Long": 85.32,
            "CurrencyID": 94,
            "Currency": "NPR",
            "CountryCode": "+977"
        },
        {
            "Key": 10298,
            "Name": "Auckland",
            "FullName": "Auckland, New Zealand",
            "Lat": -36.84,
            "Long": 174.74,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10299,
            "Name": "Dunedin",
            "FullName": "Dunedin, New Zealand",
            "Lat": -45.87,
            "Long": 170.5,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10300,
            "Name": "Gisborne",
            "FullName": "Gisborne, New Zealand",
            "Lat": -38.66,
            "Long": 178.02,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10301,
            "Name": "Kaikohe",
            "FullName": "Kaikohe, New Zealand",
            "Lat": -35.45,
            "Long": 173.82,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10302,
            "Name": "Kaitaia",
            "FullName": "Kaitaia, New Zealand",
            "Lat": -35.11,
            "Long": 173.26,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10303,
            "Name": "Kerikeri",
            "FullName": "Kerikeri, New Zealand",
            "Lat": -35.22,
            "Long": 173.93,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10304,
            "Name": "Northland",
            "FullName": "Northland, New Zealand",
            "Lat": -35.88,
            "Long": 174.46,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10305,
            "Name": "Paihia",
            "FullName": "Paihia, New Zealand",
            "Lat": -35.28,
            "Long": 174.08,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10306,
            "Name": "Wellington",
            "FullName": "Wellington, New Zealand",
            "Lat": -41.29,
            "Long": 174.78,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10307,
            "Name": "Whangarei",
            "FullName": "Whangarei, New Zealand",
            "Lat": -35.73,
            "Long": 174.32,
            "CurrencyID": 95,
            "Currency": "NZD",
            "CountryCode": "+64"
        },
        {
            "Key": 10350,
            "Name": "Panama City",
            "FullName": "Panama City, Panama",
            "Lat": 8.98,
            "Long": -79.52,
            "CurrencyID": 96,
            "Currency": "PAB",
            "CountryCode": "+507"
        },
        {
            "Key": 10351,
            "Name": "San Miguelito",
            "FullName": "San Miguelito, Panama",
            "Lat": 9.03,
            "Long": -79.5,
            "CurrencyID": 96,
            "Currency": "PAB",
            "CountryCode": "+507"
        },
        {
            "Key": 10354,
            "Name": "Arequipa",
            "FullName": "Arequipa, Peru",
            "Lat": -16.38,
            "Long": -71.53,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10355,
            "Name": "Ayacucho",
            "FullName": "Ayacucho, Peru",
            "Lat": -13.16,
            "Long": -74.22,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10356,
            "Name": "Callao",
            "FullName": "Callao, Peru",
            "Lat": -12.03,
            "Long": -77.13,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10357,
            "Name": "Chiclayo",
            "FullName": "Chiclayo, Peru",
            "Lat": -6.76,
            "Long": -79.84,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10358,
            "Name": "Chimbote",
            "FullName": "Chimbote, Peru",
            "Lat": -9.07,
            "Long": -78.59,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10359,
            "Name": "Cusco",
            "FullName": "Cusco, Peru",
            "Lat": -13.53,
            "Long": -71.97,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10360,
            "Name": "Huancayo",
            "FullName": "Huancayo, Peru",
            "Lat": -12.07,
            "Long": -75.22,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10361,
            "Name": "Ica",
            "FullName": "Ica, Peru",
            "Lat": -14.07,
            "Long": -75.73,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10362,
            "Name": "Iquitos",
            "FullName": "Iquitos, Peru",
            "Lat": -3.75,
            "Long": -73.25,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10363,
            "Name": "Juliaca",
            "FullName": "Juliaca, Peru",
            "Lat": -15.49,
            "Long": -70.13,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10364,
            "Name": "Lima",
            "FullName": "Lima, Peru",
            "Lat": -12.04,
            "Long": -77.03,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10365,
            "Name": "Piura",
            "FullName": "Piura, Peru",
            "Lat": -5.2,
            "Long": -80.63,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10366,
            "Name": "Pucallpa",
            "FullName": "Pucallpa, Peru",
            "Lat": -8.38,
            "Long": -74.55,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10367,
            "Name": "San Isidro",
            "FullName": "San Isidro, Peru",
            "Lat": -12.1,
            "Long": -77.03,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10368,
            "Name": "Santiago De Surco",
            "FullName": "Santiago De Surco, Peru",
            "Lat": -12.1,
            "Long": -76.97,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10369,
            "Name": "Tacna",
            "FullName": "Tacna, Peru",
            "Lat": -18.06,
            "Long": -70.25,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10370,
            "Name": "Trujillo",
            "FullName": "Trujillo, Peru",
            "Lat": -8.11,
            "Long": -79.03,
            "CurrencyID": 97,
            "Currency": "PEN",
            "CountryCode": "+51"
        },
        {
            "Key": 10371,
            "Name": "Angeles",
            "FullName": "Angeles, Philippines",
            "Lat": 15.15,
            "Long": 120.58,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10372,
            "Name": "Angono",
            "FullName": "Angono, Philippines",
            "Lat": 14.53,
            "Long": 121.15,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10373,
            "Name": "Antipolo",
            "FullName": "Antipolo, Philippines",
            "Lat": 14.58,
            "Long": 121.17,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10374,
            "Name": "Apalit",
            "FullName": "Apalit, Philippines",
            "Lat": 14.95,
            "Long": 120.77,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10375,
            "Name": "Arayat",
            "FullName": "Arayat, Philippines",
            "Lat": 15.15,
            "Long": 120.77,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10376,
            "Name": "Bacolod",
            "FullName": "Bacolod, Philippines",
            "Lat": 10.67,
            "Long": 122.95,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10377,
            "Name": "Bacoor",
            "FullName": "Bacoor, Philippines",
            "Lat": 14.45,
            "Long": 120.95,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10378,
            "Name": "Bago",
            "FullName": "Bago, Philippines",
            "Lat": 10.53,
            "Long": 122.83,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10379,
            "Name": "Baguio",
            "FullName": "Baguio, Philippines",
            "Lat": 16.42,
            "Long": 120.6,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10380,
            "Name": "Baliuag",
            "FullName": "Baliuag, Philippines",
            "Lat": 14.95,
            "Long": 120.88,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10381,
            "Name": "Batangas City",
            "FullName": "Batangas City, Philippines",
            "Lat": 13.75,
            "Long": 121.05,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10382,
            "Name": "Bayambang",
            "FullName": "Bayambang, Philippines",
            "Lat": 15.82,
            "Long": 120.45,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10383,
            "Name": "Bayawan",
            "FullName": "Bayawan, Philippines",
            "Lat": 9.37,
            "Long": 122.8,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10384,
            "Name": "Baybay",
            "FullName": "Baybay, Philippines",
            "Lat": 10.68,
            "Long": 124.8,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10385,
            "Name": "Binan",
            "FullName": "Binan, Philippines",
            "Lat": 14.33,
            "Long": 121.08,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10386,
            "Name": "Binangonan",
            "FullName": "Binangonan, Philippines",
            "Lat": 14.45,
            "Long": 121.19,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10387,
            "Name": "Bocaue",
            "FullName": "Bocaue, Philippines",
            "Lat": 14.8,
            "Long": 120.93,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10388,
            "Name": "Butuan",
            "FullName": "Butuan, Philippines",
            "Lat": 8.95,
            "Long": 125.53,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10389,
            "Name": "Cabanatuan",
            "FullName": "Cabanatuan, Philippines",
            "Lat": 15.48,
            "Long": 120.97,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10390,
            "Name": "Cabuyao",
            "FullName": "Cabuyao, Philippines",
            "Lat": 14.28,
            "Long": 121.12,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10391,
            "Name": "Cadiz",
            "FullName": "Cadiz, Philippines",
            "Lat": 10.95,
            "Long": 123.3,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10392,
            "Name": "Cagayan De Oro",
            "FullName": "Cagayan De Oro, Philippines",
            "Lat": 8.48,
            "Long": 124.65,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10393,
            "Name": "Cainta",
            "FullName": "Cainta, Philippines",
            "Lat": 14.57,
            "Long": 121.12,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10394,
            "Name": "Calamba",
            "FullName": "Calamba, Philippines",
            "Lat": 14.22,
            "Long": 121.17,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10395,
            "Name": "Calapan",
            "FullName": "Calapan, Philippines",
            "Lat": 13.4,
            "Long": 121.18,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10396,
            "Name": "Calbayog",
            "FullName": "Calbayog, Philippines",
            "Lat": 12.07,
            "Long": 124.6,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10397,
            "Name": "Caloocan",
            "FullName": "Caloocan, Philippines",
            "Lat": 14.65,
            "Long": 120.97,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10398,
            "Name": "Calumpit",
            "FullName": "Calumpit, Philippines",
            "Lat": 14.92,
            "Long": 120.77,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10399,
            "Name": "Candaba",
            "FullName": "Candaba, Philippines",
            "Lat": 15.1,
            "Long": 120.83,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10400,
            "Name": "Candelaria",
            "FullName": "Candelaria, Philippines",
            "Lat": 13.93,
            "Long": 121.43,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10401,
            "Name": "Capas",
            "FullName": "Capas, Philippines",
            "Lat": 15.33,
            "Long": 120.59,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10402,
            "Name": "Carcar",
            "FullName": "Carcar, Philippines",
            "Lat": 10.1,
            "Long": 123.63,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10403,
            "Name": "Cauayan",
            "FullName": "Cauayan, Philippines",
            "Lat": 16.96,
            "Long": 121.79,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10404,
            "Name": "Cavite City",
            "FullName": "Cavite City, Philippines",
            "Lat": 14.48,
            "Long": 120.9,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10405,
            "Name": "Cebu City",
            "FullName": "Cebu City, Philippines",
            "Lat": 10.28,
            "Long": 123.9,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10406,
            "Name": "Concepcion",
            "FullName": "Concepcion, Philippines",
            "Lat": 15.32,
            "Long": 120.66,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10407,
            "Name": "Consolacion",
            "FullName": "Consolacion, Philippines",
            "Lat": 10.44,
            "Long": 123.94,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10408,
            "Name": "Cotabato City",
            "FullName": "Cotabato City, Philippines",
            "Lat": 7.22,
            "Long": 124.25,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10409,
            "Name": "Dagupan",
            "FullName": "Dagupan, Philippines",
            "Lat": 16.03,
            "Long": 120.33,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10410,
            "Name": "Danao",
            "FullName": "Danao, Philippines",
            "Lat": 9.95,
            "Long": 124.22,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10411,
            "Name": "Daraga",
            "FullName": "Daraga, Philippines",
            "Lat": 13.13,
            "Long": 123.73,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10412,
            "Name": "Dasmarinas",
            "FullName": "Dasmarinas, Philippines",
            "Lat": 14.33,
            "Long": 120.94,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10413,
            "Name": "Davao City",
            "FullName": "Davao City, Philippines",
            "Lat": 7.07,
            "Long": 125.6,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10414,
            "Name": "Digos",
            "FullName": "Digos, Philippines",
            "Lat": 6.76,
            "Long": 125.35,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10415,
            "Name": "Dipolog",
            "FullName": "Dipolog, Philippines",
            "Lat": 8.57,
            "Long": 123.33,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10416,
            "Name": "Dumaguete",
            "FullName": "Dumaguete, Philippines",
            "Lat": 9.32,
            "Long": 123.3,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10417,
            "Name": "Floridablanca",
            "FullName": "Floridablanca, Philippines",
            "Lat": 14.93,
            "Long": 120.5,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10418,
            "Name": "Gapan",
            "FullName": "Gapan, Philippines",
            "Lat": 15.28,
            "Long": 120.97,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10419,
            "Name": "General Mariano Alvarez",
            "FullName": "General Mariano Alvarez, Philippines",
            "Lat": 14.3,
            "Long": 121,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10420,
            "Name": "General Santos",
            "FullName": "General Santos, Philippines",
            "Lat": 6.12,
            "Long": 125.17,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10421,
            "Name": "General Trias",
            "FullName": "General Trias, Philippines",
            "Lat": 14.38,
            "Long": 120.88,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10422,
            "Name": "Gingoog",
            "FullName": "Gingoog, Philippines",
            "Lat": 8.82,
            "Long": 125.1,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10423,
            "Name": "Glan",
            "FullName": "Glan, Philippines",
            "Lat": 5.82,
            "Long": 125.2,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10424,
            "Name": "Guagua",
            "FullName": "Guagua, Philippines",
            "Lat": 14.97,
            "Long": 120.63,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10425,
            "Name": "Guimba",
            "FullName": "Guimba, Philippines",
            "Lat": 15.66,
            "Long": 120.77,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10426,
            "Name": "Hagonoy",
            "FullName": "Hagonoy, Philippines",
            "Lat": 14.83,
            "Long": 120.73,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10427,
            "Name": "Himamaylan",
            "FullName": "Himamaylan, Philippines",
            "Lat": 10.1,
            "Long": 122.87,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10428,
            "Name": "Ilagan",
            "FullName": "Ilagan, Philippines",
            "Lat": 17.15,
            "Long": 121.89,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10429,
            "Name": "Iligan",
            "FullName": "Iligan, Philippines",
            "Lat": 8.23,
            "Long": 124.25,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10430,
            "Name": "Iloilo City",
            "FullName": "Iloilo City, Philippines",
            "Lat": 10.72,
            "Long": 122.57,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10431,
            "Name": "Imus",
            "FullName": "Imus, Philippines",
            "Lat": 14.4,
            "Long": 120.93,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10432,
            "Name": "Iriga",
            "FullName": "Iriga, Philippines",
            "Lat": 13.46,
            "Long": 123.46,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10433,
            "Name": "Jolo",
            "FullName": "Jolo, Philippines",
            "Lat": 6.05,
            "Long": 121,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10434,
            "Name": "Kabankalan",
            "FullName": "Kabankalan, Philippines",
            "Lat": 9.98,
            "Long": 122.82,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10435,
            "Name": "Kidapawan",
            "FullName": "Kidapawan, Philippines",
            "Lat": 7.02,
            "Long": 125.08,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10436,
            "Name": "Koronadal",
            "FullName": "Koronadal, Philippines",
            "Lat": 6.5,
            "Long": 124.85,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10437,
            "Name": "La Trinidad",
            "FullName": "La Trinidad, Philippines",
            "Lat": 16.45,
            "Long": 120.57,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10438,
            "Name": "Laoag",
            "FullName": "Laoag, Philippines",
            "Lat": 18.18,
            "Long": 120.58,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10439,
            "Name": "Lapu Lapu",
            "FullName": "Lapu Lapu, Philippines",
            "Lat": 10.32,
            "Long": 123.95,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10440,
            "Name": "Las Pinas",
            "FullName": "Las Pinas, Philippines",
            "Lat": 14.45,
            "Long": 120.98,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10441,
            "Name": "Legazpi",
            "FullName": "Legazpi, Philippines",
            "Lat": 13.13,
            "Long": 123.73,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10442,
            "Name": "Libmanan",
            "FullName": "Libmanan, Philippines",
            "Lat": 13.7,
            "Long": 123.07,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10443,
            "Name": "Ligao",
            "FullName": "Ligao, Philippines",
            "Lat": 13.22,
            "Long": 123.52,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10444,
            "Name": "Liloan",
            "FullName": "Liloan, Philippines",
            "Lat": 10.15,
            "Long": 125.13,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10445,
            "Name": "Lipa",
            "FullName": "Lipa, Philippines",
            "Lat": 13.94,
            "Long": 121.16,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10446,
            "Name": "Los Banos",
            "FullName": "Los Banos, Philippines",
            "Lat": 14.17,
            "Long": 121.22,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10447,
            "Name": "Lubao",
            "FullName": "Lubao, Philippines",
            "Lat": 14.93,
            "Long": 120.6,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10448,
            "Name": "Lucena",
            "FullName": "Lucena, Philippines",
            "Lat": 13.93,
            "Long": 121.62,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10449,
            "Name": "Mabalacat",
            "FullName": "Mabalacat, Philippines",
            "Lat": 15.22,
            "Long": 120.58,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10450,
            "Name": "Magalang",
            "FullName": "Magalang, Philippines",
            "Lat": 15.22,
            "Long": 120.67,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10451,
            "Name": "Makati",
            "FullName": "Makati, Philippines",
            "Lat": 14.55,
            "Long": 121.03,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10452,
            "Name": "Malabon",
            "FullName": "Malabon, Philippines",
            "Lat": 14.66,
            "Long": 120.96,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10453,
            "Name": "Malasiqui",
            "FullName": "Malasiqui, Philippines",
            "Lat": 15.92,
            "Long": 120.42,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10454,
            "Name": "Malay",
            "FullName": "Malay, Philippines",
            "Lat": 11.96,
            "Long": 121.93,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10455,
            "Name": "Malaybalay",
            "FullName": "Malaybalay, Philippines",
            "Lat": 8.15,
            "Long": 125.13,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10456,
            "Name": "Malita",
            "FullName": "Malita, Philippines",
            "Lat": 6.35,
            "Long": 125.6,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10457,
            "Name": "Malolos",
            "FullName": "Malolos, Philippines",
            "Lat": 14.84,
            "Long": 120.81,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10458,
            "Name": "Mandaluyong",
            "FullName": "Mandaluyong, Philippines",
            "Lat": 14.58,
            "Long": 121.03,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10459,
            "Name": "Mandaue",
            "FullName": "Mandaue, Philippines",
            "Lat": 10.33,
            "Long": 123.93,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10460,
            "Name": "Manila",
            "FullName": "Manila, Philippines",
            "Lat": 14.58,
            "Long": 121,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10461,
            "Name": "Marawi",
            "FullName": "Marawi, Philippines",
            "Lat": 8,
            "Long": 124.3,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10462,
            "Name": "Marikina",
            "FullName": "Marikina, Philippines",
            "Lat": 14.65,
            "Long": 121.1,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10463,
            "Name": "Marilao",
            "FullName": "Marilao, Philippines",
            "Lat": 14.76,
            "Long": 120.95,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10464,
            "Name": "Mariveles",
            "FullName": "Mariveles, Philippines",
            "Lat": 14.43,
            "Long": 120.48,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10465,
            "Name": "Mati",
            "FullName": "Mati, Philippines",
            "Lat": 6.95,
            "Long": 126.23,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10466,
            "Name": "Mexico",
            "FullName": "Mexico, Philippines",
            "Lat": 15.06,
            "Long": 120.72,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10467,
            "Name": "Meycauayan",
            "FullName": "Meycauayan, Philippines",
            "Lat": 14.73,
            "Long": 120.95,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10468,
            "Name": "Midsayap",
            "FullName": "Midsayap, Philippines",
            "Lat": 7.19,
            "Long": 124.53,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10469,
            "Name": "Minglanilla",
            "FullName": "Minglanilla, Philippines",
            "Lat": 10.25,
            "Long": 123.78,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10470,
            "Name": "Muntinlupa",
            "FullName": "Muntinlupa, Philippines",
            "Lat": 14.38,
            "Long": 121.05,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10471,
            "Name": "Naga",
            "FullName": "Naga, Philippines",
            "Lat": 13.62,
            "Long": 123.17,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10472,
            "Name": "Nasugbu",
            "FullName": "Nasugbu, Philippines",
            "Lat": 14.07,
            "Long": 120.63,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10473,
            "Name": "Navotas",
            "FullName": "Navotas, Philippines",
            "Lat": 14.67,
            "Long": 120.94,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10474,
            "Name": "Norzagaray",
            "FullName": "Norzagaray, Philippines",
            "Lat": 14.92,
            "Long": 121.05,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10475,
            "Name": "Olongapo",
            "FullName": "Olongapo, Philippines",
            "Lat": 14.83,
            "Long": 120.28,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10476,
            "Name": "Ormoc",
            "FullName": "Ormoc, Philippines",
            "Lat": 11.01,
            "Long": 124.61,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10477,
            "Name": "Ozamiz",
            "FullName": "Ozamiz, Philippines",
            "Lat": 8.15,
            "Long": 123.85,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10478,
            "Name": "Pagadian",
            "FullName": "Pagadian, Philippines",
            "Lat": 7.83,
            "Long": 123.43,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10479,
            "Name": "Panabo",
            "FullName": "Panabo, Philippines",
            "Lat": 7.31,
            "Long": 125.68,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10480,
            "Name": "Paranaque",
            "FullName": "Paranaque, Philippines",
            "Lat": 14.47,
            "Long": 121.02,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10481,
            "Name": "Pasay",
            "FullName": "Pasay, Philippines",
            "Lat": 14.55,
            "Long": 121,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10482,
            "Name": "Pasig",
            "FullName": "Pasig, Philippines",
            "Lat": 14.57,
            "Long": 121.08,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10483,
            "Name": "Pikit",
            "FullName": "Pikit, Philippines",
            "Lat": 7.05,
            "Long": 124.67,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10484,
            "Name": "Plaridel",
            "FullName": "Plaridel, Philippines",
            "Lat": 14.89,
            "Long": 120.86,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10485,
            "Name": "Polomolok",
            "FullName": "Polomolok, Philippines",
            "Lat": 6.22,
            "Long": 125.07,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10486,
            "Name": "Porac",
            "FullName": "Porac, Philippines",
            "Lat": 15.07,
            "Long": 120.54,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10487,
            "Name": "Puerto Princesa",
            "FullName": "Puerto Princesa, Philippines",
            "Lat": 9.73,
            "Long": 118.73,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10489,
            "Name": "Quezon City",
            "FullName": "Quezon City, Philippines",
            "Lat": 14.63,
            "Long": 121.03,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10490,
            "Name": "Rodriguez",
            "FullName": "Rodriguez, Philippines",
            "Lat": 14.73,
            "Long": 121.14,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10491,
            "Name": "Rosario",
            "FullName": "Rosario, Philippines",
            "Lat": 14.42,
            "Long": 120.85,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10492,
            "Name": "Roxas",
            "FullName": "Roxas, Philippines",
            "Lat": 11.43,
            "Long": 122.93,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10493,
            "Name": "Sagay",
            "FullName": "Sagay, Philippines",
            "Lat": 9.11,
            "Long": 124.73,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10494,
            "Name": "San Carlos",
            "FullName": "San Carlos, Philippines",
            "Lat": 15.93,
            "Long": 120.35,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10495,
            "Name": "San Fernando",
            "FullName": "San Fernando, Philippines",
            "Lat": 16.62,
            "Long": 120.32,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10496,
            "Name": "San Jose",
            "FullName": "San Jose, Philippines",
            "Lat": 17.15,
            "Long": 121.6,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10497,
            "Name": "San Jose Del Monte",
            "FullName": "San Jose Del Monte, Philippines",
            "Lat": 14.81,
            "Long": 121.05,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10498,
            "Name": "San Juan",
            "FullName": "San Juan, Philippines",
            "Lat": 14.6,
            "Long": 121.03,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10499,
            "Name": "San Mateo",
            "FullName": "San Mateo, Philippines",
            "Lat": 14.72,
            "Long": 121.12,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10500,
            "Name": "San Miguel",
            "FullName": "San Miguel, Philippines",
            "Lat": 10.6,
            "Long": 122.59,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10501,
            "Name": "San Pablo",
            "FullName": "San Pablo, Philippines",
            "Lat": 14.07,
            "Long": 121.33,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10502,
            "Name": "San Pedro",
            "FullName": "San Pedro, Philippines",
            "Lat": 15.84,
            "Long": 120.57,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10503,
            "Name": "Santa Cruz",
            "FullName": "Santa Cruz, Philippines",
            "Lat": 9.54,
            "Long": 123.11,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10504,
            "Name": "Santa Maria",
            "FullName": "Santa Maria, Philippines",
            "Lat": 8.03,
            "Long": 126.16,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10505,
            "Name": "Santa Rosa",
            "FullName": "Santa Rosa, Philippines",
            "Lat": 14.28,
            "Long": 121.1,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10506,
            "Name": "Santiago",
            "FullName": "Santiago, Philippines",
            "Lat": 16.68,
            "Long": 121.55,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10507,
            "Name": "Santo Tomas",
            "FullName": "Santo Tomas, Philippines",
            "Lat": 14.11,
            "Long": 121.14,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10508,
            "Name": "Sariaya",
            "FullName": "Sariaya, Philippines",
            "Lat": 13.96,
            "Long": 121.53,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10509,
            "Name": "Silang",
            "FullName": "Silang, Philippines",
            "Lat": 14.23,
            "Long": 120.98,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10510,
            "Name": "Silay",
            "FullName": "Silay, Philippines",
            "Lat": 10.8,
            "Long": 122.97,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10511,
            "Name": "Sorsogon City",
            "FullName": "Sorsogon City, Philippines",
            "Lat": 12.97,
            "Long": 124,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10512,
            "Name": "Surigao",
            "FullName": "Surigao, Philippines",
            "Lat": 9.78,
            "Long": 125.48,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10513,
            "Name": "Tabaco",
            "FullName": "Tabaco, Philippines",
            "Lat": 13.36,
            "Long": 123.73,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10514,
            "Name": "Tabuk",
            "FullName": "Tabuk, Philippines",
            "Lat": 17.45,
            "Long": 121.46,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10515,
            "Name": "Tacloban",
            "FullName": "Tacloban, Philippines",
            "Lat": 11.24,
            "Long": 125,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10516,
            "Name": "Taguig",
            "FullName": "Taguig, Philippines",
            "Lat": 14.55,
            "Long": 121.05,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10517,
            "Name": "Tagum",
            "FullName": "Tagum, Philippines",
            "Lat": 7.45,
            "Long": 125.8,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10518,
            "Name": "Talavera",
            "FullName": "Talavera, Philippines",
            "Lat": 15.58,
            "Long": 120.92,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10519,
            "Name": "Talisay",
            "FullName": "Talisay, Philippines",
            "Lat": 14.09,
            "Long": 121.02,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10520,
            "Name": "Tanauan",
            "FullName": "Tanauan, Philippines",
            "Lat": 14.09,
            "Long": 121.15,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10521,
            "Name": "Tanza",
            "FullName": "Tanza, Philippines",
            "Lat": 14.4,
            "Long": 120.83,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10522,
            "Name": "Tarlac City",
            "FullName": "Tarlac City, Philippines",
            "Lat": 15.47,
            "Long": 120.58,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10523,
            "Name": "Taytay",
            "FullName": "Taytay, Philippines",
            "Lat": 14.57,
            "Long": 121.13,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10524,
            "Name": "Toledo",
            "FullName": "Toledo, Philippines",
            "Lat": 10.38,
            "Long": 123.65,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10525,
            "Name": "Trece Martires",
            "FullName": "Trece Martires, Philippines",
            "Lat": 14.28,
            "Long": 120.85,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10526,
            "Name": "Tuguegarao",
            "FullName": "Tuguegarao, Philippines",
            "Lat": 17.62,
            "Long": 121.72,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10527,
            "Name": "Urdaneta",
            "FullName": "Urdaneta, Philippines",
            "Lat": 15.98,
            "Long": 120.57,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10528,
            "Name": "Valencia",
            "FullName": "Valencia, Philippines",
            "Lat": 7.91,
            "Long": 125.09,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10529,
            "Name": "Valenzuela",
            "FullName": "Valenzuela, Philippines",
            "Lat": 14.7,
            "Long": 120.98,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10530,
            "Name": "Zamboanga City",
            "FullName": "Zamboanga City, Philippines",
            "Lat": 6.92,
            "Long": 122.08,
            "CurrencyID": 98,
            "Currency": "PHP",
            "CountryCode": "+63"
        },
        {
            "Key": 10341,
            "Name": "Abbottabad",
            "FullName": "Abbottabad, Pakistan",
            "Lat": 34.16,
            "Long": 73.22,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10342,
            "Name": "Faisalabad",
            "FullName": "Faisalabad, Pakistan",
            "Lat": 31.43,
            "Long": 73.08,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10343,
            "Name": "Hyderabad",
            "FullName": "Hyderabad, Pakistan",
            "Lat": 25.38,
            "Long": 68.37,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10344,
            "Name": "Islamabad",
            "FullName": "Islamabad, Pakistan",
            "Lat": 33.72,
            "Long": 73.07,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10345,
            "Name": "Karachi",
            "FullName": "Karachi, Pakistan",
            "Lat": 24.86,
            "Long": 67.01,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10346,
            "Name": "Lahore",
            "FullName": "Lahore, Pakistan",
            "Lat": 31.55,
            "Long": 74.34,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10347,
            "Name": "Peshawar",
            "FullName": "Peshawar, Pakistan",
            "Lat": 34.02,
            "Long": 71.58,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10348,
            "Name": "Rawalpindi",
            "FullName": "Rawalpindi, Pakistan",
            "Lat": 33.6,
            "Long": 73.03,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10349,
            "Name": "Sialkot",
            "FullName": "Sialkot, Pakistan",
            "Lat": 32.5,
            "Long": 74.54,
            "CurrencyID": 99,
            "Currency": "PKR",
            "CountryCode": "+92"
        },
        {
            "Key": 10531,
            "Name": "Bialystok",
            "FullName": "Bialystok, Poland",
            "Lat": 53.12,
            "Long": 23.15,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10532,
            "Name": "Bydgoszcz",
            "FullName": "Bydgoszcz, Poland",
            "Lat": 53.12,
            "Long": 18,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10533,
            "Name": "Gdansk",
            "FullName": "Gdansk, Poland",
            "Lat": 54.35,
            "Long": 18.63,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10534,
            "Name": "Gdynia",
            "FullName": "Gdynia, Poland",
            "Lat": 54.5,
            "Long": 18.55,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10535,
            "Name": "Katowice",
            "FullName": "Katowice, Poland",
            "Lat": 50.27,
            "Long": 19.02,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10536,
            "Name": "Krakow",
            "FullName": "Krakow, Poland",
            "Lat": 50.06,
            "Long": 19.94,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10537,
            "Name": "Lodz",
            "FullName": "Lodz, Poland",
            "Lat": 51.78,
            "Long": 19.47,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10538,
            "Name": "Lublin",
            "FullName": "Lublin, Poland",
            "Lat": 51.23,
            "Long": 22.57,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10539,
            "Name": "Poznan",
            "FullName": "Poznan, Poland",
            "Lat": 52.24,
            "Long": 16.92,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10540,
            "Name": "Rybnik",
            "FullName": "Rybnik, Poland",
            "Lat": 50.1,
            "Long": 18.55,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10541,
            "Name": "Szczecin",
            "FullName": "Szczecin, Poland",
            "Lat": 53.43,
            "Long": 14.55,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10542,
            "Name": "Trojmiasto",
            "FullName": "Trojmiasto, Poland",
            "Lat": 54.43,
            "Long": 18.55,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10543,
            "Name": "Warsaw",
            "FullName": "Warsaw, Poland",
            "Lat": 52.23,
            "Long": 21.02,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10544,
            "Name": "Wroclaw",
            "FullName": "Wroclaw, Poland",
            "Lat": 51.1,
            "Long": 17.03,
            "CurrencyID": 100,
            "Currency": "PLN",
            "CountryCode": "+48"
        },
        {
            "Key": 10352,
            "Name": "Asuncion",
            "FullName": "Asuncion, Paraguay",
            "Lat": -25.27,
            "Long": -57.63,
            "CurrencyID": 101,
            "Currency": "PYG",
            "CountryCode": "+595"
        },
        {
            "Key": 10353,
            "Name": "Ciudad Del Este",
            "FullName": "Ciudad Del Este, Paraguay",
            "Lat": -25.52,
            "Long": -54.62,
            "CurrencyID": 101,
            "Currency": "PYG",
            "CountryCode": "+595"
        },
        {
            "Key": 10549,
            "Name": "Doha",
            "FullName": "Doha, Qatar",
            "Lat": 25.29,
            "Long": 51.53,
            "CurrencyID": 102,
            "Currency": "QAR",
            "CountryCode": "+974"
        },
        {
            "Key": 10550,
            "Name": "Brasov",
            "FullName": "Brasov, Romania",
            "Lat": 45.67,
            "Long": 25.62,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10552,
            "Name": "Cluj Napoca",
            "FullName": "Cluj Napoca, Romania",
            "Lat": 46.77,
            "Long": 23.58,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10553,
            "Name": "Constanta",
            "FullName": "Constanta, Romania",
            "Lat": 44.17,
            "Long": 28.64,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10554,
            "Name": "Craiova",
            "FullName": "Craiova, Romania",
            "Lat": 44.33,
            "Long": 23.82,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10555,
            "Name": "Iasi",
            "FullName": "Iasi, Romania",
            "Lat": 47.16,
            "Long": 27.59,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10556,
            "Name": "Lugoj",
            "FullName": "Lugoj, Romania",
            "Lat": 45.69,
            "Long": 21.9,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10557,
            "Name": "Ploiesti",
            "FullName": "Ploiesti, Romania",
            "Lat": 44.93,
            "Long": 26.03,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10558,
            "Name": "Sibiu",
            "FullName": "Sibiu, Romania",
            "Lat": 45.79,
            "Long": 24.15,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10559,
            "Name": "Timisoara",
            "FullName": "Timisoara, Romania",
            "Lat": 45.76,
            "Long": 21.23,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10560,
            "Name": "Tulcea",
            "FullName": "Tulcea, Romania",
            "Lat": 44.98,
            "Long": 28.77,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10561,
            "Name": "Bucharest",
            "FullName": "Bucharest, Romania",
            "Lat": 44.43,
            "Long": 26.1,
            "CurrencyID": 103,
            "Currency": "RON",
            "CountryCode": "+40"
        },
        {
            "Key": 10626,
            "Name": "Belgrade",
            "FullName": "Belgrade, Serbia",
            "Lat": 44.82,
            "Long": 20.47,
            "CurrencyID": 104,
            "Currency": "RSD",
            "CountryCode": "+381"
        },
        {
            "Key": 10565,
            "Name": "Arkhangelsk",
            "FullName": "Arkhangelsk, Russia",
            "Lat": 64.53,
            "Long": 40.53,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10566,
            "Name": "Astrakhan",
            "FullName": "Astrakhan, Russia",
            "Lat": 46.32,
            "Long": 48.04,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10567,
            "Name": "Barnaul",
            "FullName": "Barnaul, Russia",
            "Lat": 53.33,
            "Long": 83.75,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10568,
            "Name": "Belgorod",
            "FullName": "Belgorod, Russia",
            "Lat": 50.6,
            "Long": 36.6,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10569,
            "Name": "Bryansk",
            "FullName": "Bryansk, Russia",
            "Lat": 53.23,
            "Long": 34.37,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10570,
            "Name": "Cheboksary",
            "FullName": "Cheboksary, Russia",
            "Lat": 56.15,
            "Long": 47.23,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10571,
            "Name": "Chelyabinsk",
            "FullName": "Chelyabinsk, Russia",
            "Lat": 55.15,
            "Long": 61.38,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10572,
            "Name": "Grozny",
            "FullName": "Grozny, Russia",
            "Lat": 43.32,
            "Long": 45.72,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10573,
            "Name": "Irkutsk",
            "FullName": "Irkutsk, Russia",
            "Lat": 52.31,
            "Long": 104.3,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10574,
            "Name": "Ivanovo",
            "FullName": "Ivanovo, Russia",
            "Lat": 57,
            "Long": 40.98,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10575,
            "Name": "Izhevsk",
            "FullName": "Izhevsk, Russia",
            "Lat": 56.83,
            "Long": 53.18,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10576,
            "Name": "Kaliningrad",
            "FullName": "Kaliningrad, Russia",
            "Lat": 54.72,
            "Long": 20.52,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10577,
            "Name": "Kaluga",
            "FullName": "Kaluga, Russia",
            "Lat": 54.55,
            "Long": 36.28,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10578,
            "Name": "Kazan",
            "FullName": "Kazan, Russia",
            "Lat": 55.79,
            "Long": 49.13,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10579,
            "Name": "Kemerovo",
            "FullName": "Kemerovo, Russia",
            "Lat": 55.36,
            "Long": 86.09,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10580,
            "Name": "Khabarovsk",
            "FullName": "Khabarovsk, Russia",
            "Lat": 48.48,
            "Long": 135.07,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10581,
            "Name": "Kirov",
            "FullName": "Kirov, Russia",
            "Lat": 58.6,
            "Long": 49.65,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10582,
            "Name": "Krasnodar",
            "FullName": "Krasnodar, Russia",
            "Lat": 45.03,
            "Long": 38.97,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10583,
            "Name": "Krasnoyarsk",
            "FullName": "Krasnoyarsk, Russia",
            "Lat": 56.02,
            "Long": 93.07,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10584,
            "Name": "Kurgan",
            "FullName": "Kurgan, Russia",
            "Lat": 55.47,
            "Long": 65.35,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10585,
            "Name": "Kursk",
            "FullName": "Kursk, Russia",
            "Lat": 51.72,
            "Long": 36.18,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10586,
            "Name": "Lipetsk",
            "FullName": "Lipetsk, Russia",
            "Lat": 52.62,
            "Long": 39.6,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10587,
            "Name": "Magnitogorsk",
            "FullName": "Magnitogorsk, Russia",
            "Lat": 53.38,
            "Long": 59.03,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10588,
            "Name": "Makhachkala",
            "FullName": "Makhachkala, Russia",
            "Lat": 42.97,
            "Long": 47.5,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10589,
            "Name": "Moscow",
            "FullName": "Moscow, Russia",
            "Lat": 55.75,
            "Long": 37.62,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10590,
            "Name": "Naberezhnye Chelny",
            "FullName": "Naberezhnye Chelny, Russia",
            "Lat": 55.68,
            "Long": 52.32,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10591,
            "Name": "Nizhny Novgorod",
            "FullName": "Nizhny Novgorod, Russia",
            "Lat": 56.33,
            "Long": 44.01,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10592,
            "Name": "Nizhny Tagil",
            "FullName": "Nizhny Tagil, Russia",
            "Lat": 57.92,
            "Long": 59.97,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10593,
            "Name": "Novokuznetsk",
            "FullName": "Novokuznetsk, Russia",
            "Lat": 53.75,
            "Long": 87.12,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10594,
            "Name": "Novosibirsk",
            "FullName": "Novosibirsk, Russia",
            "Lat": 55.02,
            "Long": 82.93,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10595,
            "Name": "Omsk",
            "FullName": "Omsk, Russia",
            "Lat": 54.98,
            "Long": 73.37,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10596,
            "Name": "Orenburg",
            "FullName": "Orenburg, Russia",
            "Lat": 51.78,
            "Long": 55.1,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10597,
            "Name": "Penza",
            "FullName": "Penza, Russia",
            "Lat": 53.14,
            "Long": 44.99,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10598,
            "Name": "Perm",
            "FullName": "Perm, Russia",
            "Lat": 58,
            "Long": 56.32,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10599,
            "Name": "Rostov On Don",
            "FullName": "Rostov On Don, Russia",
            "Lat": 47.23,
            "Long": 39.7,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10600,
            "Name": "Ryazan",
            "FullName": "Ryazan, Russia",
            "Lat": 54.6,
            "Long": 39.7,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10601,
            "Name": "Saint Petersburg",
            "FullName": "Saint Petersburg, Russia",
            "Lat": 59.95,
            "Long": 30.3,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10602,
            "Name": "Samara",
            "FullName": "Samara, Russia",
            "Lat": 53.2,
            "Long": 50.14,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10603,
            "Name": "Saratov",
            "FullName": "Saratov, Russia",
            "Lat": 51.53,
            "Long": 46.02,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10604,
            "Name": "Smolensk",
            "FullName": "Smolensk, Russia",
            "Lat": 54.78,
            "Long": 32.05,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10605,
            "Name": "Sochi",
            "FullName": "Sochi, Russia",
            "Lat": 43.59,
            "Long": 39.72,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10606,
            "Name": "Stavropol",
            "FullName": "Stavropol, Russia",
            "Lat": 45.05,
            "Long": 41.98,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10607,
            "Name": "Tolyatti",
            "FullName": "Tolyatti, Russia",
            "Lat": 53.51,
            "Long": 49.42,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10608,
            "Name": "Tomsk",
            "FullName": "Tomsk, Russia",
            "Lat": 56.5,
            "Long": 84.97,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10609,
            "Name": "Tula",
            "FullName": "Tula, Russia",
            "Lat": 54.2,
            "Long": 37.62,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10610,
            "Name": "Tver",
            "FullName": "Tver, Russia",
            "Lat": 56.86,
            "Long": 35.92,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10611,
            "Name": "Tyumen",
            "FullName": "Tyumen, Russia",
            "Lat": 57.15,
            "Long": 65.53,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10612,
            "Name": "Ufa",
            "FullName": "Ufa, Russia",
            "Lat": 54.75,
            "Long": 55.97,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10613,
            "Name": "Ulan Ude",
            "FullName": "Ulan Ude, Russia",
            "Lat": 51.83,
            "Long": 107.6,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10614,
            "Name": "Ulyanovsk",
            "FullName": "Ulyanovsk, Russia",
            "Lat": 54.32,
            "Long": 48.37,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10615,
            "Name": "Vladimir",
            "FullName": "Vladimir, Russia",
            "Lat": 56.13,
            "Long": 40.42,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10616,
            "Name": "Vladivostok",
            "FullName": "Vladivostok, Russia",
            "Lat": 43.13,
            "Long": 131.9,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10617,
            "Name": "Volgograd",
            "FullName": "Volgograd, Russia",
            "Lat": 48.7,
            "Long": 44.52,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10618,
            "Name": "Voronezh",
            "FullName": "Voronezh, Russia",
            "Lat": 51.67,
            "Long": 39.21,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10619,
            "Name": "Yaroslavl",
            "FullName": "Yaroslavl, Russia",
            "Lat": 57.62,
            "Long": 39.85,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10620,
            "Name": "Yekaterinburg",
            "FullName": "Yekaterinburg, Russia",
            "Lat": 56.83,
            "Long": 60.58,
            "CurrencyID": 105,
            "Currency": "RUB",
            "CountryCode": "+7"
        },
        {
            "Key": 10621,
            "Name": "Kigali",
            "FullName": "Kigali, Rwanda",
            "Lat": 1.94,
            "Long": 30.06,
            "CurrencyID": 106,
            "Currency": "RWF",
            "CountryCode": "+250"
        },
        {
            "Key": 10622,
            "Name": "Dammam",
            "FullName": "Dammam, Saudi Arabia",
            "Lat": 26.28,
            "Long": 50.2,
            "CurrencyID": 107,
            "Currency": "SAR",
            "CountryCode": "+966"
        },
        {
            "Key": 10623,
            "Name": "Jeddah",
            "FullName": "Jeddah, Saudi Arabia",
            "Lat": 21.54,
            "Long": 39.17,
            "CurrencyID": 107,
            "Currency": "SAR",
            "CountryCode": "+966"
        },
        {
            "Key": 10624,
            "Name": "Riyadh",
            "FullName": "Riyadh, Saudi Arabia",
            "Lat": 24.63,
            "Long": 46.72,
            "CurrencyID": 107,
            "Currency": "SAR",
            "CountryCode": "+966"
        },
        {
            "Key": 10696,
            "Name": "Khartoum",
            "FullName": "Khartoum, Sudan",
            "Lat": 15.63,
            "Long": 32.48,
            "CurrencyID": 108,
            "Currency": "SDG",
            "CountryCode": "+249"
        },
        {
            "Key": 10697,
            "Name": "Omdurman",
            "FullName": "Omdurman, Sudan",
            "Lat": 15.65,
            "Long": 32.53,
            "CurrencyID": 108,
            "Currency": "SDG",
            "CountryCode": "+249"
        },
        {
            "Key": 11524,
            "Name": "Singapore",
            "FullName": "Singapore, Singapore",
            "Lat": 1.35,
            "Long": 103.82,
            "CurrencyID": 108,
            "Currency": "SDG",
            "CountryCode": "+65"
        },
        {
            "Key": 10698,
            "Name": "Gothenburg",
            "FullName": "Gothenburg, Sweden",
            "Lat": 57.7,
            "Long": 11.97,
            "CurrencyID": 109,
            "Currency": "SEK",
            "CountryCode": "+46"
        },
        {
            "Key": 10699,
            "Name": "Lulea",
            "FullName": "Lulea, Sweden",
            "Lat": 65.58,
            "Long": 22.15,
            "CurrencyID": 109,
            "Currency": "SEK",
            "CountryCode": "+46"
        },
        {
            "Key": 10700,
            "Name": "Malmo",
            "FullName": "Malmo, Sweden",
            "Lat": 55.61,
            "Long": 13.04,
            "CurrencyID": 109,
            "Currency": "SEK",
            "CountryCode": "+46"
        },
        {
            "Key": 10701,
            "Name": "Sollentuna",
            "FullName": "Sollentuna, Sweden",
            "Lat": 59.43,
            "Long": 17.95,
            "CurrencyID": 109,
            "Currency": "SEK",
            "CountryCode": "+46"
        },
        {
            "Key": 10702,
            "Name": "Stockholm",
            "FullName": "Stockholm, Sweden",
            "Lat": 59.33,
            "Long": 18.07,
            "CurrencyID": 109,
            "Currency": "SEK",
            "CountryCode": "+46"
        },
        {
            "Key": 10703,
            "Name": "Vasteras",
            "FullName": "Vasteras, Sweden",
            "Lat": 59.62,
            "Long": 16.55,
            "CurrencyID": 109,
            "Currency": "SEK",
            "CountryCode": "+46"
        },
        {
            "Key": 10627,
            "Name": "Freetown",
            "FullName": "Freetown, Sierra Leone",
            "Lat": 8.48,
            "Long": -13.23,
            "CurrencyID": 110,
            "Currency": "SLL",
            "CountryCode": "+232"
        },
        {
            "Key": 10633,
            "Name": "Hargeisa",
            "FullName": "Hargeisa, Somalia",
            "Lat": 9.57,
            "Long": 44.07,
            "CurrencyID": 111,
            "Currency": "SOS",
            "CountryCode": "+252"
        },
        {
            "Key": 10634,
            "Name": "Mogadishu",
            "FullName": "Mogadishu, Somalia",
            "Lat": 2.03,
            "Long": 45.35,
            "CurrencyID": 111,
            "Currency": "SOS",
            "CountryCode": "+252"
        },
        {
            "Key": 10726,
            "Name": "Bangkok",
            "FullName": "Bangkok, Thailand",
            "Lat": 13.76,
            "Long": 100.5,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10727,
            "Name": "Chiang Mai",
            "FullName": "Chiang Mai, Thailand",
            "Lat": 18.8,
            "Long": 99,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10728,
            "Name": "Hua Hin",
            "FullName": "Hua Hin, Thailand",
            "Lat": 12.57,
            "Long": 99.96,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10729,
            "Name": "Ko Samui",
            "FullName": "Ko Samui, Thailand",
            "Lat": 9.5,
            "Long": 100,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10730,
            "Name": "Pattaya",
            "FullName": "Pattaya, Thailand",
            "Lat": 12.93,
            "Long": 100.88,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10731,
            "Name": "Phuket",
            "FullName": "Phuket, Thailand",
            "Lat": 7.89,
            "Long": 98.4,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10732,
            "Name": "Surat Thani",
            "FullName": "Surat Thani, Thailand",
            "Lat": 9.14,
            "Long": 99.33,
            "CurrencyID": 112,
            "Currency": "THB",
            "CountryCode": "+66"
        },
        {
            "Key": 10720,
            "Name": "Dusanbe",
            "FullName": "Dusanbe, Tagikistan",
            "Lat": 38.54,
            "Long": 68.78,
            "CurrencyID": 113,
            "Currency": "TJS",
            "CountryCode": "+992"
        },
        {
            "Key": 10733,
            "Name": "La Marsa",
            "FullName": "La Marsa, Tunisia",
            "Lat": 36.88,
            "Long": 10.33,
            "CurrencyID": 114,
            "Currency": "TND",
            "CountryCode": "+216"
        },
        {
            "Key": 10734,
            "Name": "Tunis",
            "FullName": "Tunis, Tunisia",
            "Lat": 36.8,
            "Long": 10.18,
            "CurrencyID": 114,
            "Currency": "TND",
            "CountryCode": "+216"
        },
        {
            "Key": 10735,
            "Name": "Adana",
            "FullName": "Adana, Turkey",
            "Lat": 37,
            "Long": 35.32,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10736,
            "Name": "Ankara",
            "FullName": "Ankara, Turkey",
            "Lat": 39.93,
            "Long": 32.87,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10737,
            "Name": "Antalya",
            "FullName": "Antalya, Turkey",
            "Lat": 36.9,
            "Long": 30.68,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10738,
            "Name": "Bursa",
            "FullName": "Bursa, Turkey",
            "Lat": 40.18,
            "Long": 29.05,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10739,
            "Name": "Denizli",
            "FullName": "Denizli, Turkey",
            "Lat": 37.77,
            "Long": 29.08,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10740,
            "Name": "Gaziantep",
            "FullName": "Gaziantep, Turkey",
            "Lat": 37.07,
            "Long": 37.38,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10741,
            "Name": "Istanbul",
            "FullName": "Istanbul, Turkey",
            "Lat": 41.01,
            "Long": 28.95,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10742,
            "Name": "Izmir",
            "FullName": "Izmir, Turkey",
            "Lat": 38.42,
            "Long": 27.13,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10743,
            "Name": "Konya",
            "FullName": "Konya, Turkey",
            "Lat": 37.87,
            "Long": 32.48,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10744,
            "Name": "Mersin",
            "FullName": "Mersin, Turkey",
            "Lat": 36.8,
            "Long": 34.63,
            "CurrencyID": 115,
            "Currency": "TRY",
            "CountryCode": "+90"
        },
        {
            "Key": 10721,
            "Name": "Daan District",
            "FullName": "Daan District, Taiwan",
            "Lat": 25.03,
            "Long": 121.54,
            "CurrencyID": 116,
            "Currency": "TWD",
            "CountryCode": "+886"
        },
        {
            "Key": 10722,
            "Name": "Kaohsuing",
            "FullName": "Kaohsuing, Taiwan",
            "Lat": 22.63,
            "Long": 120.27,
            "CurrencyID": 116,
            "Currency": "TWD",
            "CountryCode": "+886"
        },
        {
            "Key": 10723,
            "Name": "Taipei",
            "FullName": "Taipei, Taiwan",
            "Lat": 25.03,
            "Long": 121.63,
            "CurrencyID": 116,
            "Currency": "TWD",
            "CountryCode": "+886"
        },
        {
            "Key": 10724,
            "Name": "Zuoying District",
            "FullName": "Zuoying District, Taiwan",
            "Lat": 22.68,
            "Long": 120.29,
            "CurrencyID": 116,
            "Currency": "TWD",
            "CountryCode": "+886"
        },
        {
            "Key": 10725,
            "Name": "Dar Es Salaam",
            "FullName": "Dar Es Salaam, Tanzania",
            "Lat": 6.8,
            "Long": 39.28,
            "CurrencyID": 117,
            "Currency": "TZS",
            "CountryCode": "+255"
        },
        {
            "Key": 10747,
            "Name": "Dnipropetrovsk",
            "FullName": "Dnipropetrovsk, Ukraine",
            "Lat": 48.45,
            "Long": 34.98,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10748,
            "Name": "Donetsk",
            "FullName": "Donetsk, Ukraine",
            "Lat": 48,
            "Long": 37.81,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10749,
            "Name": "Kharkiv",
            "FullName": "Kharkiv, Ukraine",
            "Lat": 50,
            "Long": 36.23,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10750,
            "Name": "Kiev",
            "FullName": "Kiev, Ukraine",
            "Lat": 50.45,
            "Long": 30.52,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10751,
            "Name": "Kryvyi Rih",
            "FullName": "Kryvyi Rih, Ukraine",
            "Lat": 48.02,
            "Long": 33.38,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10752,
            "Name": "Luhansk",
            "FullName": "Luhansk, Ukraine",
            "Lat": 48.92,
            "Long": 39.02,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10753,
            "Name": "Lviv",
            "FullName": "Lviv, Ukraine",
            "Lat": 49.85,
            "Long": 49.85,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10754,
            "Name": "Makiivka",
            "FullName": "Makiivka, Ukraine",
            "Lat": 48.08,
            "Long": 38.07,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10755,
            "Name": "Mariupol",
            "FullName": "Mariupol, Ukraine",
            "Lat": 47.1,
            "Long": 37.55,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10756,
            "Name": "Mykolaiv",
            "FullName": "Mykolaiv, Ukraine",
            "Lat": 46.97,
            "Long": 32,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10757,
            "Name": "Odessa",
            "FullName": "Odessa, Ukraine",
            "Lat": 46.47,
            "Long": 30.73,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10758,
            "Name": "Sevastopol",
            "FullName": "Sevastopol, Ukraine",
            "Lat": 44.6,
            "Long": 33.53,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10759,
            "Name": "Simferopol",
            "FullName": "Simferopol, Ukraine",
            "Lat": 44.95,
            "Long": 34.1,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10760,
            "Name": "Ukrainka",
            "FullName": "Ukrainka, Ukraine",
            "Lat": 50.15,
            "Long": 30.74,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10761,
            "Name": "Vinnytsia",
            "FullName": "Vinnytsia, Ukraine",
            "Lat": 49.23,
            "Long": 28.48,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10762,
            "Name": "Zaporizhia",
            "FullName": "Zaporizhia, Ukraine",
            "Lat": 47.83,
            "Long": 35.17,
            "CurrencyID": 118,
            "Currency": "UAH",
            "CountryCode": "+380"
        },
        {
            "Key": 10745,
            "Name": "Kajjansi",
            "FullName": "Kajjansi, Uganda",
            "Lat": 0.22,
            "Long": 32.55,
            "CurrencyID": 119,
            "Currency": "UGX",
            "CountryCode": "+256"
        },
        {
            "Key": 10746,
            "Name": "Kampala",
            "FullName": "Kampala, Uganda",
            "Lat": 0.31,
            "Long": 32.58,
            "CurrencyID": 119,
            "Currency": "UGX",
            "CountryCode": "+256"
        },
        {
            "Key": 10548,
            "Name": "San Juan",
            "FullName": "San Juan, Puerto Rico",
            "Lat": 18.45,
            "Long": -66.07,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10870,
            "Name": "Abilene",
            "FullName": "Abilene, United States",
            "Lat": 32.45,
            "Long": -99.75,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10871,
            "Name": "Akron",
            "FullName": "Akron, United States",
            "Lat": 41.07,
            "Long": -81.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10872,
            "Name": "Alamo",
            "FullName": "Alamo, United States",
            "Lat": 37.85,
            "Long": -122.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10874,
            "Name": "Albuquerque",
            "FullName": "Albuquerque, United States",
            "Lat": 35.11,
            "Long": -106.61,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10875,
            "Name": "Alexandria, Virginia",
            "FullName": "Alexandria, Virginia, United States",
            "Lat": 38.8,
            "Long": -77.05,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10876,
            "Name": "Aliso Viejo",
            "FullName": "Aliso Viejo, United States",
            "Lat": 33.58,
            "Long": -117.73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10877,
            "Name": "Allentown",
            "FullName": "Allentown, United States",
            "Lat": 40.6,
            "Long": -75.48,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10878,
            "Name": "Altamonte Springs",
            "FullName": "Altamonte Springs, United States",
            "Lat": 28.66,
            "Long": -81.39,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10879,
            "Name": "Amarillo",
            "FullName": "Amarillo, United States",
            "Lat": 35.2,
            "Long": -101.85,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10880,
            "Name": "Anaheim",
            "FullName": "Anaheim, United States",
            "Lat": 33.84,
            "Long": -117.89,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10881,
            "Name": "Anchorage",
            "FullName": "Anchorage, United States",
            "Lat": 61.22,
            "Long": -149.9,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10882,
            "Name": "Huntington Beach",
            "FullName": "Huntington Beach, United States",
            "Lat": 33.69,
            "Long": -118,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10883,
            "Name": "Huntsville",
            "FullName": "Huntsville, United States",
            "Lat": 34.73,
            "Long": -86.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10884,
            "Name": "Hurst",
            "FullName": "Hurst, United States",
            "Lat": 32.84,
            "Long": -97.18,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10885,
            "Name": "Idaho Falls",
            "FullName": "Idaho Falls, United States",
            "Lat": 43.5,
            "Long": -112.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10886,
            "Name": "Independence",
            "FullName": "Independence, United States",
            "Lat": 39.08,
            "Long": -94.41,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10887,
            "Name": "Indianapolis",
            "FullName": "Indianapolis, United States",
            "Lat": 39.79,
            "Long": -86.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10888,
            "Name": "Inglewood",
            "FullName": "Inglewood, United States",
            "Lat": 33.96,
            "Long": -118.35,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10889,
            "Name": "Inkster",
            "FullName": "Inkster, United States",
            "Lat": 42.29,
            "Long": -83.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10890,
            "Name": "Irvine",
            "FullName": "Irvine, United States",
            "Lat": 33.67,
            "Long": -117.82,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10891,
            "Name": "Irving",
            "FullName": "Irving, United States",
            "Lat": 32.81,
            "Long": -96.95,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10892,
            "Name": "Isla Vista",
            "FullName": "Isla Vista, United States",
            "Lat": 34.41,
            "Long": -119.86,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10893,
            "Name": "Jackson, Mississippi",
            "FullName": "Jackson, Mississippi, United States",
            "Lat": 32.3,
            "Long": -90.18,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10894,
            "Name": "Jackson, Missouri",
            "FullName": "Jackson, Missouri, United States",
            "Lat": 37.38,
            "Long": -89.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10895,
            "Name": "Jacksonville",
            "FullName": "Jacksonville, United States",
            "Lat": 30.34,
            "Long": -81.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10896,
            "Name": "Jefferson City",
            "FullName": "Jefferson City, United States",
            "Lat": 38.58,
            "Long": -92.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10897,
            "Name": "Jericho",
            "FullName": "Jericho, United States",
            "Lat": 44.5,
            "Long": -73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10898,
            "Name": "Jersey City",
            "FullName": "Jersey City, United States",
            "Lat": 40.71,
            "Long": -74.07,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10899,
            "Name": "Joliet",
            "FullName": "Joliet, United States",
            "Lat": 41.52,
            "Long": -88.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10900,
            "Name": "Kailua",
            "FullName": "Kailua, United States",
            "Lat": 21.4,
            "Long": -157.74,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10901,
            "Name": "Kalamazoo",
            "FullName": "Kalamazoo, United States",
            "Lat": 42.29,
            "Long": -85.59,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10902,
            "Name": "Kaneohe",
            "FullName": "Kaneohe, United States",
            "Lat": 21.41,
            "Long": -157.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10903,
            "Name": "Kansas City",
            "FullName": "Kansas City, United States",
            "Lat": 39.1,
            "Long": -94.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10904,
            "Name": "Kapolei",
            "FullName": "Kapolei, United States",
            "Lat": 21.33,
            "Long": -158.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10905,
            "Name": "Kent",
            "FullName": "Kent, United States",
            "Lat": 47.38,
            "Long": -122.23,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10906,
            "Name": "Key Biscayne",
            "FullName": "Key Biscayne, United States",
            "Lat": 25.69,
            "Long": -80.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10907,
            "Name": "Kihei",
            "FullName": "Kihei, United States",
            "Lat": 20.76,
            "Long": -156.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10908,
            "Name": "Killeen",
            "FullName": "Killeen, United States",
            "Lat": 31.11,
            "Long": -97.73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10909,
            "Name": "Kirkland",
            "FullName": "Kirkland, United States",
            "Lat": 47.69,
            "Long": -122.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10910,
            "Name": "Knoxville",
            "FullName": "Knoxville, United States",
            "Lat": 35.97,
            "Long": -83.94,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10911,
            "Name": "La Mesa",
            "FullName": "La Mesa, United States",
            "Lat": 32.77,
            "Long": -117.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10912,
            "Name": "Lafayette",
            "FullName": "Lafayette, United States",
            "Lat": 30.22,
            "Long": -92.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10913,
            "Name": "Lake Oswego",
            "FullName": "Lake Oswego, United States",
            "Lat": 45.42,
            "Long": -122.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10914,
            "Name": "Lake Worth",
            "FullName": "Lake Worth, United States",
            "Lat": 26.62,
            "Long": -80.06,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10915,
            "Name": "Lakeland",
            "FullName": "Lakeland, United States",
            "Lat": 28.04,
            "Long": -81.96,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10916,
            "Name": "Lakewood",
            "FullName": "Lakewood, United States",
            "Lat": 39.7,
            "Long": -105.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10917,
            "Name": "Lancaster",
            "FullName": "Lancaster, United States",
            "Lat": 34.68,
            "Long": -118.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10918,
            "Name": "Lansing",
            "FullName": "Lansing, United States",
            "Lat": 42.73,
            "Long": -84.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10919,
            "Name": "Laredo",
            "FullName": "Laredo, United States",
            "Lat": 27.53,
            "Long": -99.48,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10920,
            "Name": "Las Cruces",
            "FullName": "Las Cruces, United States",
            "Lat": 32.31,
            "Long": -106.78,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10921,
            "Name": "Las Vegas",
            "FullName": "Las Vegas, United States",
            "Lat": 36.12,
            "Long": -115.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10922,
            "Name": "Lawrence",
            "FullName": "Lawrence, United States",
            "Lat": 38.97,
            "Long": -95.24,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10923,
            "Name": "League City",
            "FullName": "League City, United States",
            "Lat": 29.5,
            "Long": -95.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10924,
            "Name": "Lehigh Valley",
            "FullName": "Lehigh Valley, United States",
            "Lat": 40.65,
            "Long": -75.44,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10925,
            "Name": "Lewisville",
            "FullName": "Lewisville, United States",
            "Lat": 33.04,
            "Long": -97.01,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10926,
            "Name": "Lexington",
            "FullName": "Lexington, United States",
            "Lat": 38.03,
            "Long": -84.49,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10928,
            "Name": "Lincoln",
            "FullName": "Lincoln, United States",
            "Lat": 40.81,
            "Long": -96.68,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10929,
            "Name": "Lincoln Park",
            "FullName": "Lincoln Park, United States",
            "Lat": 41.92,
            "Long": -87.65,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10930,
            "Name": "Lindenwold",
            "FullName": "Lindenwold, United States",
            "Lat": 39.82,
            "Long": -74.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10931,
            "Name": "Litchfield Park",
            "FullName": "Litchfield Park, United States",
            "Lat": 33.49,
            "Long": -112.36,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10932,
            "Name": "Little Elm",
            "FullName": "Little Elm, United States",
            "Lat": 33.16,
            "Long": -96.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10933,
            "Name": "Little Rock",
            "FullName": "Little Rock, United States",
            "Lat": 34.74,
            "Long": -92.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10934,
            "Name": "Livonia",
            "FullName": "Livonia, United States",
            "Lat": 42.4,
            "Long": -83.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10935,
            "Name": "Long Beach",
            "FullName": "Long Beach, United States",
            "Lat": 33.77,
            "Long": -118.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10936,
            "Name": "Longmont",
            "FullName": "Longmont, United States",
            "Lat": 40.17,
            "Long": -105.11,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10937,
            "Name": "Lonoke",
            "FullName": "Lonoke, United States",
            "Lat": 34.76,
            "Long": -91.89,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10938,
            "Name": "Los Angeles",
            "FullName": "Los Angeles, United States",
            "Lat": 34.05,
            "Long": -118.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10939,
            "Name": "Louisville",
            "FullName": "Louisville, United States",
            "Lat": 38.25,
            "Long": -85.77,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10940,
            "Name": "Lowell",
            "FullName": "Lowell, United States",
            "Lat": 42.64,
            "Long": -71.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10941,
            "Name": "Lubbock",
            "FullName": "Lubbock, United States",
            "Lat": 33.57,
            "Long": -101.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10942,
            "Name": "Ludowici",
            "FullName": "Ludowici, United States",
            "Lat": 31.71,
            "Long": -81.74,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10943,
            "Name": "Lutz",
            "FullName": "Lutz, United States",
            "Lat": 28.14,
            "Long": -82.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10944,
            "Name": "Lyndhurst",
            "FullName": "Lyndhurst, United States",
            "Lat": 40.8,
            "Long": -74.11,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10945,
            "Name": "Lynnwood",
            "FullName": "Lynnwood, United States",
            "Lat": 47.83,
            "Long": -122.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10946,
            "Name": "Macomb",
            "FullName": "Macomb, United States",
            "Lat": 40.46,
            "Long": -90.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10947,
            "Name": "Macon",
            "FullName": "Macon, United States",
            "Lat": 32.83,
            "Long": -83.65,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10948,
            "Name": "Madison",
            "FullName": "Madison, United States",
            "Lat": 43.07,
            "Long": -89.4,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10949,
            "Name": "Manchester",
            "FullName": "Manchester, United States",
            "Lat": 42.99,
            "Long": -71.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10951,
            "Name": "Manteca",
            "FullName": "Manteca, United States",
            "Lat": 37.8,
            "Long": -121.22,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10952,
            "Name": "Martinsburg",
            "FullName": "Martinsburg, United States",
            "Lat": 39.46,
            "Long": -77.97,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10953,
            "Name": "Marysville",
            "FullName": "Marysville, United States",
            "Lat": 48.06,
            "Long": -122.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10954,
            "Name": "Massillon",
            "FullName": "Massillon, United States",
            "Lat": 40.8,
            "Long": -81.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10955,
            "Name": "Maui",
            "FullName": "Maui, United States",
            "Lat": 20.8,
            "Long": -156.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10956,
            "Name": "Mcallen",
            "FullName": "Mcallen, United States",
            "Lat": 26.2,
            "Long": -98.23,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10957,
            "Name": "Mckinney",
            "FullName": "Mckinney, United States",
            "Lat": 33.2,
            "Long": -96.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10958,
            "Name": "Melbourne",
            "FullName": "Melbourne, United States",
            "Lat": 28.12,
            "Long": -80.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10959,
            "Name": "Memphis",
            "FullName": "Memphis, United States",
            "Lat": 35.12,
            "Long": -89.97,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10960,
            "Name": "Mentor",
            "FullName": "Mentor, United States",
            "Lat": 41.69,
            "Long": -81.34,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10961,
            "Name": "Meridian",
            "FullName": "Meridian, United States",
            "Lat": 43.61,
            "Long": -116.4,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10962,
            "Name": "Merritt Island",
            "FullName": "Merritt Island, United States",
            "Lat": 28.36,
            "Long": -80.68,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10963,
            "Name": "Mesa",
            "FullName": "Mesa, United States",
            "Lat": 33.41,
            "Long": -111.83,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10964,
            "Name": "Mesquite",
            "FullName": "Mesquite, United States",
            "Lat": 32.78,
            "Long": -96.61,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10965,
            "Name": "Miami",
            "FullName": "Miami, United States",
            "Lat": 25.78,
            "Long": -80.21,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10966,
            "Name": "Miami Gardens",
            "FullName": "Miami Gardens, United States",
            "Lat": 25.94,
            "Long": -80.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10967,
            "Name": "Midland",
            "FullName": "Midland, United States",
            "Lat": 32,
            "Long": -102.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10968,
            "Name": "Mill Creek",
            "FullName": "Mill Creek, United States",
            "Lat": 47.86,
            "Long": -122.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10969,
            "Name": "Milwaukee",
            "FullName": "Milwaukee, United States",
            "Lat": 43.05,
            "Long": -87.95,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10970,
            "Name": "Minneapolis",
            "FullName": "Minneapolis, United States",
            "Lat": 44.98,
            "Long": -93.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10971,
            "Name": "Miramar",
            "FullName": "Miramar, United States",
            "Lat": 25.98,
            "Long": -80.28,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10972,
            "Name": "Missouri City",
            "FullName": "Missouri City, United States",
            "Lat": 29.58,
            "Long": -95.54,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10973,
            "Name": "Mobile",
            "FullName": "Mobile, United States",
            "Lat": 30.69,
            "Long": -88.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10974,
            "Name": "Modesto",
            "FullName": "Modesto, United States",
            "Lat": 37.66,
            "Long": -120.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10975,
            "Name": "Montgomery",
            "FullName": "Montgomery, United States",
            "Lat": 32.36,
            "Long": -86.28,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10976,
            "Name": "Moreno Valley",
            "FullName": "Moreno Valley, United States",
            "Lat": 33.94,
            "Long": -117.23,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10977,
            "Name": "Mount Dora",
            "FullName": "Mount Dora, United States",
            "Lat": 28.81,
            "Long": -81.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10978,
            "Name": "Mount Laurel",
            "FullName": "Mount Laurel, United States",
            "Lat": 39.95,
            "Long": -74.9,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10979,
            "Name": "Murfreesboro",
            "FullName": "Murfreesboro, United States",
            "Lat": 35.85,
            "Long": -86.39,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10980,
            "Name": "Murrieta",
            "FullName": "Murrieta, United States",
            "Lat": 33.57,
            "Long": -117.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10981,
            "Name": "Myrtle Beach",
            "FullName": "Myrtle Beach, United States",
            "Lat": 33.72,
            "Long": -78.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10982,
            "Name": "Naperville",
            "FullName": "Naperville, United States",
            "Lat": 41.75,
            "Long": -88.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10983,
            "Name": "Naples",
            "FullName": "Naples, United States",
            "Lat": 26.15,
            "Long": -81.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10984,
            "Name": "Nashville",
            "FullName": "Nashville, United States",
            "Lat": 36.17,
            "Long": -86.78,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10985,
            "Name": "New Albany, Indiana",
            "FullName": "New Albany, Indiana, United States",
            "Lat": 38.3,
            "Long": -85.82,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10986,
            "Name": "New Albany, Ohio",
            "FullName": "New Albany, Ohio, United States",
            "Lat": 40.09,
            "Long": -82.79,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10987,
            "Name": "New Haven",
            "FullName": "New Haven, United States",
            "Lat": 41.31,
            "Long": -72.92,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10988,
            "Name": "New London",
            "FullName": "New London, United States",
            "Lat": 41.35,
            "Long": -72.1,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10989,
            "Name": "New Orleans",
            "FullName": "New Orleans, United States",
            "Lat": 29.95,
            "Long": -90.07,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10990,
            "Name": "New Port Richey",
            "FullName": "New Port Richey, United States",
            "Lat": 28.25,
            "Long": -82.72,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10992,
            "Name": "Newark",
            "FullName": "Newark, United States",
            "Lat": 40.72,
            "Long": -74.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10993,
            "Name": "Newnan",
            "FullName": "Newnan, United States",
            "Lat": 33.38,
            "Long": -84.79,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10994,
            "Name": "Newport News",
            "FullName": "Newport News, United States",
            "Lat": 37.07,
            "Long": -76.48,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10995,
            "Name": "Niwot",
            "FullName": "Niwot, United States",
            "Lat": 40.1,
            "Long": -105.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10996,
            "Name": "Norfolk",
            "FullName": "Norfolk, United States",
            "Lat": 36.92,
            "Long": -76.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10997,
            "Name": "Norman",
            "FullName": "Norman, United States",
            "Lat": 35.22,
            "Long": -97.44,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10998,
            "Name": "North Charleston",
            "FullName": "North Charleston, United States",
            "Lat": 32.89,
            "Long": -80.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 10999,
            "Name": "North Las Vegas",
            "FullName": "North Las Vegas, United States",
            "Lat": 36.23,
            "Long": -115.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11000,
            "Name": "Norwalk",
            "FullName": "Norwalk, United States",
            "Lat": 41.09,
            "Long": -73.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11001,
            "Name": "Norwich",
            "FullName": "Norwich, United States",
            "Lat": 41.55,
            "Long": -72.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11002,
            "Name": "Oakland",
            "FullName": "Oakland, United States",
            "Lat": 37.8,
            "Long": -122.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11003,
            "Name": "Oakland Park",
            "FullName": "Oakland Park, United States",
            "Lat": 26.18,
            "Long": -80.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11004,
            "Name": "Ocala",
            "FullName": "Ocala, United States",
            "Lat": 29.19,
            "Long": -82.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11005,
            "Name": "Oceanside",
            "FullName": "Oceanside, United States",
            "Lat": 33.21,
            "Long": -117.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11006,
            "Name": "Ocoee",
            "FullName": "Ocoee, United States",
            "Lat": 28.57,
            "Long": -81.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11007,
            "Name": "Odessa",
            "FullName": "Odessa, United States",
            "Lat": 31.86,
            "Long": -102.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11008,
            "Name": "Ojai",
            "FullName": "Ojai, United States",
            "Lat": 34.45,
            "Long": -119.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11009,
            "Name": "Oklahoma City",
            "FullName": "Oklahoma City, United States",
            "Lat": 35.48,
            "Long": -97.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11010,
            "Name": "Olathe",
            "FullName": "Olathe, United States",
            "Lat": 38.88,
            "Long": -94.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11011,
            "Name": "Old Saybrook",
            "FullName": "Old Saybrook, United States",
            "Lat": 41.29,
            "Long": -72.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11012,
            "Name": "Omaha",
            "FullName": "Omaha, United States",
            "Lat": 41.25,
            "Long": -96,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11013,
            "Name": "Ontario",
            "FullName": "Ontario, United States",
            "Lat": 34.05,
            "Long": -117.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11014,
            "Name": "Orange",
            "FullName": "Orange, United States",
            "Lat": 33.88,
            "Long": -117.83,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11015,
            "Name": "Orem",
            "FullName": "Orem, United States",
            "Lat": 40.3,
            "Long": -111.7,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11016,
            "Name": "Orlando",
            "FullName": "Orlando, United States",
            "Lat": 28.42,
            "Long": -81.3,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11017,
            "Name": "Orono",
            "FullName": "Orono, United States",
            "Lat": 44.88,
            "Long": -68.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11018,
            "Name": "Outer Banks",
            "FullName": "Outer Banks, United States",
            "Lat": 35.37,
            "Long": -75.5,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11019,
            "Name": "Overland Park",
            "FullName": "Overland Park, United States",
            "Lat": 38.98,
            "Long": -94.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11020,
            "Name": "Oviedo",
            "FullName": "Oviedo, United States",
            "Lat": 28.66,
            "Long": -81.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11021,
            "Name": "Owens Cross Roads",
            "FullName": "Owens Cross Roads, United States",
            "Lat": 34.59,
            "Long": -86.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11022,
            "Name": "Oxnard",
            "FullName": "Oxnard, United States",
            "Lat": 34.19,
            "Long": -119.18,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11023,
            "Name": "Paducah",
            "FullName": "Paducah, United States",
            "Lat": 37.07,
            "Long": -88.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11024,
            "Name": "Palm Bay",
            "FullName": "Palm Bay, United States",
            "Lat": 28,
            "Long": -80.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11025,
            "Name": "Palm Beach",
            "FullName": "Palm Beach, United States",
            "Lat": 26.71,
            "Long": -80.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11026,
            "Name": "Palm Coast",
            "FullName": "Palm Coast, United States",
            "Lat": 29.54,
            "Long": -81.22,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11027,
            "Name": "Palm Springs",
            "FullName": "Palm Springs, United States",
            "Lat": 33.83,
            "Long": -116.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11028,
            "Name": "Palmdale",
            "FullName": "Palmdale, United States",
            "Lat": 34.58,
            "Long": -118.1,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11029,
            "Name": "Palo Alto",
            "FullName": "Palo Alto, United States",
            "Lat": 37.43,
            "Long": -122.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11030,
            "Name": "Panama City",
            "FullName": "Panama City, United States",
            "Lat": 30.17,
            "Long": -85.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11031,
            "Name": "Paradise",
            "FullName": "Paradise, United States",
            "Lat": 36.1,
            "Long": -115.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11032,
            "Name": "Pasadena, California",
            "FullName": "Pasadena, California, United States",
            "Lat": 34.16,
            "Long": -118.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11033,
            "Name": "Pasadena, Nevada",
            "FullName": "Pasadena, Nevada, United States",
            "Lat": 29.68,
            "Long": -95.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11034,
            "Name": "Passaic",
            "FullName": "Passaic, United States",
            "Lat": 40.86,
            "Long": -74.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11035,
            "Name": "Paterson",
            "FullName": "Paterson, United States",
            "Lat": 40.91,
            "Long": -74.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11036,
            "Name": "Patterson",
            "FullName": "Patterson, United States",
            "Lat": 37.47,
            "Long": -121.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11037,
            "Name": "Pearland",
            "FullName": "Pearland, United States",
            "Lat": 29.55,
            "Long": -95.3,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11038,
            "Name": "Pekin",
            "FullName": "Pekin, United States",
            "Lat": 40.57,
            "Long": -89.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11039,
            "Name": "Pembroke Pines",
            "FullName": "Pembroke Pines, United States",
            "Lat": 26.01,
            "Long": -80.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11040,
            "Name": "Pennsauken Township",
            "FullName": "Pennsauken Township, United States",
            "Lat": 39.97,
            "Long": -75.06,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11041,
            "Name": "Pensacola",
            "FullName": "Pensacola, United States",
            "Lat": 30.43,
            "Long": -87.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11042,
            "Name": "Peoria, Arizona",
            "FullName": "Peoria, Arizona, United States",
            "Lat": 33.58,
            "Long": -112.24,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11043,
            "Name": "Peoria, IL",
            "FullName": "Peoria, IL, United States",
            "Lat": 40.72,
            "Long": -89.61,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11044,
            "Name": "Philadelphia",
            "FullName": "Philadelphia, United States",
            "Lat": 39.95,
            "Long": -75.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11045,
            "Name": "Phoenix",
            "FullName": "Phoenix, United States",
            "Lat": 33.45,
            "Long": -112.07,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11046,
            "Name": "Piedmont Triad",
            "FullName": "Piedmont Triad, United States",
            "Lat": 36.1,
            "Long": -79.94,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11047,
            "Name": "Pinellas Park",
            "FullName": "Pinellas Park, United States",
            "Lat": 27.85,
            "Long": -82.71,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11048,
            "Name": "Pittsburgh",
            "FullName": "Pittsburgh, United States",
            "Lat": 40.44,
            "Long": -79.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11049,
            "Name": "Pittsfield",
            "FullName": "Pittsfield, United States",
            "Lat": 42.45,
            "Long": -73.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11051,
            "Name": "Plano",
            "FullName": "Plano, United States",
            "Lat": 33.02,
            "Long": -96.7,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11052,
            "Name": "Plantation",
            "FullName": "Plantation, United States",
            "Lat": 26.12,
            "Long": -80.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11053,
            "Name": "Pleasant Grove",
            "FullName": "Pleasant Grove, United States",
            "Lat": 40.37,
            "Long": -111.73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11054,
            "Name": "Pomona",
            "FullName": "Pomona, United States",
            "Lat": 34.06,
            "Long": -117.76,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11055,
            "Name": "Pompano Beach",
            "FullName": "Pompano Beach, United States",
            "Lat": 26.23,
            "Long": -80.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11056,
            "Name": "Pontiac",
            "FullName": "Pontiac, United States",
            "Lat": 42.65,
            "Long": -83.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11057,
            "Name": "Port Richey",
            "FullName": "Port Richey, United States",
            "Lat": 28.25,
            "Long": -82.72,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11058,
            "Name": "Port St Lucie",
            "FullName": "Port St Lucie, United States",
            "Lat": 27.28,
            "Long": -80.36,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11059,
            "Name": "Port Townsend",
            "FullName": "Port Townsend, United States",
            "Lat": 48.12,
            "Long": -122.78,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11060,
            "Name": "Portland",
            "FullName": "Portland, United States",
            "Lat": 45.52,
            "Long": -122.68,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11062,
            "Name": "Post Falls",
            "FullName": "Post Falls, United States",
            "Lat": 47.71,
            "Long": -116.95,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11063,
            "Name": "Poulsbo",
            "FullName": "Poulsbo, United States",
            "Lat": 47.73,
            "Long": -122.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11064,
            "Name": "Powell",
            "FullName": "Powell, United States",
            "Lat": 40.16,
            "Long": -83.07,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11065,
            "Name": "Prairie Village",
            "FullName": "Prairie Village, United States",
            "Lat": 38.99,
            "Long": -94.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11066,
            "Name": "Providence",
            "FullName": "Providence, United States",
            "Lat": 41.82,
            "Long": -71.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11067,
            "Name": "Provo",
            "FullName": "Provo, United States",
            "Lat": 40.24,
            "Long": -111.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11068,
            "Name": "Pueblo",
            "FullName": "Pueblo, United States",
            "Lat": 38.27,
            "Long": -104.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11069,
            "Name": "Puyallup",
            "FullName": "Puyallup, United States",
            "Lat": 47.18,
            "Long": -122.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11070,
            "Name": "Queen Creek",
            "FullName": "Queen Creek, United States",
            "Lat": 33.26,
            "Long": -111.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11071,
            "Name": "Raleigh",
            "FullName": "Raleigh, United States",
            "Lat": 35.78,
            "Long": -78.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11072,
            "Name": "Rancho Cucamonga",
            "FullName": "Rancho Cucamonga, United States",
            "Lat": 34.12,
            "Long": -117.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11073,
            "Name": "Rancho Santa Fe",
            "FullName": "Rancho Santa Fe, United States",
            "Lat": 33.02,
            "Long": -117.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11074,
            "Name": "Raymore",
            "FullName": "Raymore, United States",
            "Lat": 38.8,
            "Long": -94.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11075,
            "Name": "Reading",
            "FullName": "Reading, United States",
            "Lat": 40.34,
            "Long": -75.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11076,
            "Name": "Redding",
            "FullName": "Redding, United States",
            "Lat": 40.58,
            "Long": -122.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11077,
            "Name": "Redmond",
            "FullName": "Redmond, United States",
            "Lat": 47.67,
            "Long": -122.12,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11078,
            "Name": "Reno",
            "FullName": "Reno, United States",
            "Lat": 39.53,
            "Long": -119.82,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11079,
            "Name": "Renton",
            "FullName": "Renton, United States",
            "Lat": 47.49,
            "Long": -122.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11080,
            "Name": "Rialto",
            "FullName": "Rialto, United States",
            "Lat": 34.11,
            "Long": -117.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11081,
            "Name": "Richardson",
            "FullName": "Richardson, United States",
            "Lat": 32.97,
            "Long": -96.72,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11082,
            "Name": "Richmond, California",
            "FullName": "Richmond, California, United States",
            "Lat": 37.94,
            "Long": -122.35,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11083,
            "Name": "Richmond, Virginia",
            "FullName": "Richmond, Virginia, United States",
            "Lat": 37.53,
            "Long": -77.47,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11084,
            "Name": "Riverside",
            "FullName": "Riverside, United States",
            "Lat": 33.95,
            "Long": -117.4,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11085,
            "Name": "Roanoke Blacksburg",
            "FullName": "Roanoke Blacksburg, United States",
            "Lat": 37.33,
            "Long": -79.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11088,
            "Name": "Rockford",
            "FullName": "Rockford, United States",
            "Lat": 42.26,
            "Long": -89.06,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11089,
            "Name": "Rockville",
            "FullName": "Rockville, United States",
            "Lat": 39.08,
            "Long": -77.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11090,
            "Name": "Rohnert Park",
            "FullName": "Rohnert Park, United States",
            "Lat": 38.35,
            "Long": -122.7,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11091,
            "Name": "Roseville",
            "FullName": "Roseville, United States",
            "Lat": 38.75,
            "Long": -121.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11092,
            "Name": "Round Rock",
            "FullName": "Round Rock, United States",
            "Lat": 30.51,
            "Long": -97.68,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11093,
            "Name": "Royal Oak",
            "FullName": "Royal Oak, United States",
            "Lat": 42.49,
            "Long": -83.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11094,
            "Name": "Sacramento",
            "FullName": "Sacramento, United States",
            "Lat": 38.56,
            "Long": -121.47,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11095,
            "Name": "Saint Louis",
            "FullName": "Saint Louis, United States",
            "Lat": 38.63,
            "Long": -90.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11096,
            "Name": "Saint Paul",
            "FullName": "Saint Paul, United States",
            "Lat": 44.94,
            "Long": -93.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11097,
            "Name": "Salem",
            "FullName": "Salem, United States",
            "Lat": 44.93,
            "Long": -123.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11098,
            "Name": "Salinas",
            "FullName": "Salinas, United States",
            "Lat": 36.68,
            "Long": -121.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11099,
            "Name": "Salt Lake City",
            "FullName": "Salt Lake City, United States",
            "Lat": 40.75,
            "Long": -111.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11100,
            "Name": "San Antonio",
            "FullName": "San Antonio, United States",
            "Lat": 29.42,
            "Long": -98.5,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11101,
            "Name": "San Bernardino",
            "FullName": "San Bernardino, United States",
            "Lat": 34.1,
            "Long": -117.3,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11102,
            "Name": "San Clemente",
            "FullName": "San Clemente, United States",
            "Lat": 33.44,
            "Long": -117.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11103,
            "Name": "San Diego",
            "FullName": "San Diego, United States",
            "Lat": 32.72,
            "Long": -117.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11104,
            "Name": "San Fernando",
            "FullName": "San Fernando, United States",
            "Lat": 34.29,
            "Long": -118.44,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11105,
            "Name": "San Francisco",
            "FullName": "San Francisco, United States",
            "Lat": 37.78,
            "Long": -122.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11106,
            "Name": "San Jose",
            "FullName": "San Jose, United States",
            "Lat": 37.34,
            "Long": -121.89,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11107,
            "Name": "San Juan Capistrano",
            "FullName": "San Juan Capistrano, United States",
            "Lat": 33.5,
            "Long": -117.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11108,
            "Name": "San Leandro",
            "FullName": "San Leandro, United States",
            "Lat": 37.73,
            "Long": -122.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11109,
            "Name": "San Luis Obispo",
            "FullName": "San Luis Obispo, United States",
            "Lat": 35.27,
            "Long": -120.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11110,
            "Name": "San Mateo",
            "FullName": "San Mateo, United States",
            "Lat": 37.55,
            "Long": -122.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11111,
            "Name": "San Ramon",
            "FullName": "San Ramon, United States",
            "Lat": 37.78,
            "Long": -121.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11112,
            "Name": "Sandy Springs",
            "FullName": "Sandy Springs, United States",
            "Lat": 33.94,
            "Long": -84.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11113,
            "Name": "Sant Louis",
            "FullName": "Sant Louis, United States",
            "Lat": 38.63,
            "Long": -90.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11114,
            "Name": "Santa Ana",
            "FullName": "Santa Ana, United States",
            "Lat": 33.74,
            "Long": -117.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11115,
            "Name": "Santa Barbara",
            "FullName": "Santa Barbara, United States",
            "Lat": 34.43,
            "Long": -119.71,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11116,
            "Name": "Santa Clara",
            "FullName": "Santa Clara, United States",
            "Lat": 37.35,
            "Long": -121.97,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11117,
            "Name": "Santa Clarita",
            "FullName": "Santa Clarita, United States",
            "Lat": 34.42,
            "Long": -118.51,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11118,
            "Name": "Santa Fe",
            "FullName": "Santa Fe, United States",
            "Lat": 35.67,
            "Long": -105.96,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11119,
            "Name": "Santa Maria",
            "FullName": "Santa Maria, United States",
            "Lat": 34.95,
            "Long": -120.43,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11120,
            "Name": "Santa Rosa",
            "FullName": "Santa Rosa, United States",
            "Lat": 38.45,
            "Long": -122.7,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11121,
            "Name": "Sarasota",
            "FullName": "Sarasota, United States",
            "Lat": 27.34,
            "Long": -82.54,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11122,
            "Name": "Savannah",
            "FullName": "Savannah, United States",
            "Lat": 32.02,
            "Long": -81.12,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11124,
            "Name": "Scottsdale",
            "FullName": "Scottsdale, United States",
            "Lat": 33.5,
            "Long": -111.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11125,
            "Name": "Seattle",
            "FullName": "Seattle, United States",
            "Lat": 47.61,
            "Long": -122.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11126,
            "Name": "Sebastopol",
            "FullName": "Sebastopol, United States",
            "Lat": 38.4,
            "Long": -122.83,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11127,
            "Name": "Shawnee",
            "FullName": "Shawnee, United States",
            "Lat": 35.34,
            "Long": -96.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11128,
            "Name": "Shelby Township",
            "FullName": "Shelby Township, United States",
            "Lat": 43.6,
            "Long": -86.36,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11129,
            "Name": "Shepherdstown",
            "FullName": "Shepherdstown, United States",
            "Lat": 39.43,
            "Long": -77.81,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11130,
            "Name": "Shreveport",
            "FullName": "Shreveport, United States",
            "Lat": 32.51,
            "Long": -93.75,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11131,
            "Name": "Shrewsbury",
            "FullName": "Shrewsbury, United States",
            "Lat": 42.3,
            "Long": -71.71,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11132,
            "Name": "Simi Valley",
            "FullName": "Simi Valley, United States",
            "Lat": 34.27,
            "Long": -118.74,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11133,
            "Name": "Simpsonville",
            "FullName": "Simpsonville, United States",
            "Lat": 34.73,
            "Long": -82.26,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11134,
            "Name": "Sioux Falls",
            "FullName": "Sioux Falls, United States",
            "Lat": 43.54,
            "Long": -96.73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11135,
            "Name": "Smyrna",
            "FullName": "Smyrna, United States",
            "Lat": 33.87,
            "Long": -84.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11136,
            "Name": "Solana Beach",
            "FullName": "Solana Beach, United States",
            "Lat": 33,
            "Long": -117.26,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11137,
            "Name": "Somersworth",
            "FullName": "Somersworth, United States",
            "Lat": 43.26,
            "Long": -70.86,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11138,
            "Name": "South Bend",
            "FullName": "South Bend, United States",
            "Lat": 41.67,
            "Long": -86.26,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11139,
            "Name": "South Lyon",
            "FullName": "South Lyon, United States",
            "Lat": 42.46,
            "Long": -83.65,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11140,
            "Name": "South Scottsdale",
            "FullName": "South Scottsdale, United States",
            "Lat": 33.48,
            "Long": -111.92,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11141,
            "Name": "South Windsor",
            "FullName": "South Windsor, United States",
            "Lat": 41.83,
            "Long": -72.57,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11142,
            "Name": "Spanish Fork",
            "FullName": "Spanish Fork, United States",
            "Lat": 40.1,
            "Long": -111.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11143,
            "Name": "Sparks",
            "FullName": "Sparks, United States",
            "Lat": 39.55,
            "Long": -119.74,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11144,
            "Name": "Spokane",
            "FullName": "Spokane, United States",
            "Lat": 47.66,
            "Long": -117.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11145,
            "Name": "Spring",
            "FullName": "Spring, United States",
            "Lat": 33.98,
            "Long": -111.26,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11146,
            "Name": "Ann Arbor",
            "FullName": "Ann Arbor, United States",
            "Lat": 42.28,
            "Long": -83.75,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11147,
            "Name": "Antioch",
            "FullName": "Antioch, United States",
            "Lat": 38.01,
            "Long": -121.81,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11148,
            "Name": "Apache Junction",
            "FullName": "Apache Junction, United States",
            "Lat": 33.41,
            "Long": -111.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11149,
            "Name": "Apex",
            "FullName": "Apex, United States",
            "Lat": 35.73,
            "Long": -78.85,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11150,
            "Name": "Apopka",
            "FullName": "Apopka, United States",
            "Lat": 28.68,
            "Long": -81.51,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11151,
            "Name": "Arcata",
            "FullName": "Arcata, United States",
            "Lat": 40.87,
            "Long": -124.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11152,
            "Name": "Arlington",
            "FullName": "Arlington, United States",
            "Lat": 32.7,
            "Long": -97.12,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11153,
            "Name": "Arnold",
            "FullName": "Arnold, United States",
            "Lat": 38.43,
            "Long": -90.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11154,
            "Name": "Arvada",
            "FullName": "Arvada, United States",
            "Lat": 39.83,
            "Long": -105.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11155,
            "Name": "Asheville",
            "FullName": "Asheville, United States",
            "Lat": 35.58,
            "Long": -82.56,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11156,
            "Name": "Athens",
            "FullName": "Athens, United States",
            "Lat": 33.95,
            "Long": -83.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11157,
            "Name": "Atlanta",
            "FullName": "Atlanta, United States",
            "Lat": 33.76,
            "Long": -84.39,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11158,
            "Name": "Augusta",
            "FullName": "Augusta, United States",
            "Lat": 33.47,
            "Long": -81.97,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11159,
            "Name": "Aumsville",
            "FullName": "Aumsville, United States",
            "Lat": 44.84,
            "Long": -122.87,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11160,
            "Name": "Aurora",
            "FullName": "Aurora, United States",
            "Lat": 39.83,
            "Long": -105.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11161,
            "Name": "Austin",
            "FullName": "Austin, United States",
            "Lat": 30.25,
            "Long": -97.75,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11162,
            "Name": "Aventura",
            "FullName": "Aventura, United States",
            "Lat": 25.96,
            "Long": -80.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11163,
            "Name": "Avondale",
            "FullName": "Avondale, United States",
            "Lat": 33.43,
            "Long": -112.35,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11164,
            "Name": "Bainbridge Island",
            "FullName": "Bainbridge Island, United States",
            "Lat": 47.66,
            "Long": -122.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11165,
            "Name": "Bakersfield",
            "FullName": "Bakersfield, United States",
            "Lat": 35.37,
            "Long": -119.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11168,
            "Name": "Baltimore",
            "FullName": "Baltimore, United States",
            "Lat": 39.28,
            "Long": -76.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11169,
            "Name": "Bangor",
            "FullName": "Bangor, United States",
            "Lat": 44.8,
            "Long": -68.77,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11170,
            "Name": "Baton Rouge",
            "FullName": "Baton Rouge, United States",
            "Lat": 30.45,
            "Long": -91.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11171,
            "Name": "Beachwood",
            "FullName": "Beachwood, United States",
            "Lat": 41.48,
            "Long": -81.5,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11172,
            "Name": "Beaumont",
            "FullName": "Beaumont, United States",
            "Lat": 30.08,
            "Long": -94.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11173,
            "Name": "Beaverton",
            "FullName": "Beaverton, United States",
            "Lat": 45.49,
            "Long": -122.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11174,
            "Name": "Bellevue, Nebraska",
            "FullName": "Bellevue, Nebraska, United States",
            "Lat": 41.16,
            "Long": -95.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11175,
            "Name": "Bellevue, Washington",
            "FullName": "Bellevue, Washington, United States",
            "Lat": 47.6,
            "Long": -122.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11176,
            "Name": "Bellingham",
            "FullName": "Bellingham, United States",
            "Lat": 48.75,
            "Long": -122.47,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11177,
            "Name": "Belton",
            "FullName": "Belton, United States",
            "Lat": 38.82,
            "Long": -94.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11178,
            "Name": "Bensalem",
            "FullName": "Bensalem, United States",
            "Lat": 40.11,
            "Long": -74.94,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11179,
            "Name": "Berkeley",
            "FullName": "Berkeley, United States",
            "Lat": 37.87,
            "Long": -37.87,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11180,
            "Name": "Bethesda",
            "FullName": "Bethesda, United States",
            "Lat": 38.98,
            "Long": -77.11,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11181,
            "Name": "Billings",
            "FullName": "Billings, United States",
            "Lat": 45.79,
            "Long": -108.54,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11182,
            "Name": "Birmingham, Alabama",
            "FullName": "Birmingham, Alabama, United States",
            "Lat": 33.52,
            "Long": -86.81,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11183,
            "Name": "Bloomfield, Michigan",
            "FullName": "Bloomfield, Michigan, United States",
            "Lat": 42.57,
            "Long": -83.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11184,
            "Name": "Bloomfield, New Jersey",
            "FullName": "Bloomfield, New Jersey, United States",
            "Lat": 40.81,
            "Long": -74.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11185,
            "Name": "Bloomington Normal",
            "FullName": "Bloomington Normal, United States",
            "Lat": 40.48,
            "Long": -88.92,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11186,
            "Name": "Boca Raton",
            "FullName": "Boca Raton, United States",
            "Lat": 26.37,
            "Long": -80.1,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11187,
            "Name": "Boise",
            "FullName": "Boise, United States",
            "Lat": 43.62,
            "Long": -116.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11188,
            "Name": "Bossier City",
            "FullName": "Bossier City, United States",
            "Lat": 32.52,
            "Long": -93.69,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11189,
            "Name": "Boston",
            "FullName": "Boston, United States",
            "Lat": 42.36,
            "Long": -71.06,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11190,
            "Name": "Bothell",
            "FullName": "Bothell, United States",
            "Lat": 47.77,
            "Long": -122.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11191,
            "Name": "Boulder",
            "FullName": "Boulder, United States",
            "Lat": 40.03,
            "Long": -105.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11192,
            "Name": "Boynton Beach",
            "FullName": "Boynton Beach, United States",
            "Lat": 26.53,
            "Long": -80.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11193,
            "Name": "Brandon",
            "FullName": "Brandon, United States",
            "Lat": 32.27,
            "Long": -89.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11194,
            "Name": "Bremerton",
            "FullName": "Bremerton, United States",
            "Lat": 47.57,
            "Long": -122.65,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11195,
            "Name": "Bridgeport",
            "FullName": "Bridgeport, United States",
            "Lat": 41.19,
            "Long": -73.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11196,
            "Name": "Broken Arrow",
            "FullName": "Broken Arrow, United States",
            "Lat": 36.04,
            "Long": -95.78,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11200,
            "Name": "Brownsville",
            "FullName": "Brownsville, United States",
            "Lat": 25.91,
            "Long": -97.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11202,
            "Name": "Burbank",
            "FullName": "Burbank, United States",
            "Lat": 34.18,
            "Long": -118.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11203,
            "Name": "Burlington, Vermont",
            "FullName": "Burlington, Vermont, United States",
            "Lat": 44.48,
            "Long": -73.21,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11204,
            "Name": "Calabasas",
            "FullName": "Calabasas, United States",
            "Lat": 34.14,
            "Long": -118.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11205,
            "Name": "Camarillo",
            "FullName": "Camarillo, United States",
            "Lat": 34.23,
            "Long": -119.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11206,
            "Name": "Cambridge, Massachusetts",
            "FullName": "Cambridge, Massachusetts, United States",
            "Lat": 42.37,
            "Long": -71.11,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11207,
            "Name": "Cape Coral",
            "FullName": "Cape Coral, United States",
            "Lat": 26.64,
            "Long": -81.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11208,
            "Name": "Carlsbad",
            "FullName": "Carlsbad, United States",
            "Lat": 33.12,
            "Long": -117.3,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11209,
            "Name": "Carrboro",
            "FullName": "Carrboro, United States",
            "Lat": 35.92,
            "Long": -79.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11210,
            "Name": "Carrollton",
            "FullName": "Carrollton, United States",
            "Lat": 32.99,
            "Long": -96.89,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11211,
            "Name": "Cary",
            "FullName": "Cary, United States",
            "Lat": 35.78,
            "Long": -78.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11212,
            "Name": "Castro Valley",
            "FullName": "Castro Valley, United States",
            "Lat": 37.69,
            "Long": -122.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11213,
            "Name": "Cedar Park",
            "FullName": "Cedar Park, United States",
            "Lat": 30.51,
            "Long": -97.83,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11214,
            "Name": "Cedar Rapids",
            "FullName": "Cedar Rapids, United States",
            "Lat": 41.98,
            "Long": -91.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11215,
            "Name": "Centennial",
            "FullName": "Centennial, United States",
            "Lat": 39.59,
            "Long": -104.87,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11216,
            "Name": "Chamblee",
            "FullName": "Chamblee, United States",
            "Lat": 33.89,
            "Long": -84.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11217,
            "Name": "Champaign",
            "FullName": "Champaign, United States",
            "Lat": 40.12,
            "Long": -88.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11218,
            "Name": "Chandler",
            "FullName": "Chandler, United States",
            "Lat": 33.3,
            "Long": -111.83,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11219,
            "Name": "Chapel Hill",
            "FullName": "Chapel Hill, United States",
            "Lat": 35.93,
            "Long": -79.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11220,
            "Name": "Charles Town",
            "FullName": "Charles Town, United States",
            "Lat": 39.28,
            "Long": -77.86,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11221,
            "Name": "Charleston, South Carolina",
            "FullName": "Charleston, South Carolina, United States",
            "Lat": 32.78,
            "Long": -79.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11222,
            "Name": "Charleston, West Virginia",
            "FullName": "Charleston, West Virginia, United States",
            "Lat": 38.35,
            "Long": -81.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11223,
            "Name": "Charlotte",
            "FullName": "Charlotte, United States",
            "Lat": 35.23,
            "Long": -80.84,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11224,
            "Name": "Charlottesville",
            "FullName": "Charlottesville, United States",
            "Lat": 38.03,
            "Long": -78.48,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11225,
            "Name": "Chattanooga",
            "FullName": "Chattanooga, United States",
            "Lat": 35.05,
            "Long": -85.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11226,
            "Name": "Chesapeake",
            "FullName": "Chesapeake, United States",
            "Lat": 36.77,
            "Long": -76.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11227,
            "Name": "Chicago",
            "FullName": "Chicago, United States",
            "Lat": 41.84,
            "Long": -87.68,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11228,
            "Name": "Chowchilla",
            "FullName": "Chowchilla, United States",
            "Lat": 37.12,
            "Long": -120.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11229,
            "Name": "Chula Vista",
            "FullName": "Chula Vista, United States",
            "Lat": 32.63,
            "Long": -117.05,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11230,
            "Name": "Cicero",
            "FullName": "Cicero, United States",
            "Lat": 41.85,
            "Long": -87.75,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11231,
            "Name": "Cincinnati",
            "FullName": "Cincinnati, United States",
            "Lat": 39.1,
            "Long": -84.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11232,
            "Name": "Clarksville",
            "FullName": "Clarksville, United States",
            "Lat": 36.53,
            "Long": -87.36,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11233,
            "Name": "Clayton",
            "FullName": "Clayton, United States",
            "Lat": 31.72,
            "Long": -91.54,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11234,
            "Name": "Clearwater",
            "FullName": "Clearwater, United States",
            "Lat": 27.97,
            "Long": -82.76,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11235,
            "Name": "Clemson",
            "FullName": "Clemson, United States",
            "Lat": 34.69,
            "Long": -82.81,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11236,
            "Name": "Cleveland",
            "FullName": "Cleveland, United States",
            "Lat": 41.48,
            "Long": -81.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11238,
            "Name": "Clinton",
            "FullName": "Clinton, United States",
            "Lat": 41.84,
            "Long": -90.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11239,
            "Name": "Clovis",
            "FullName": "Clovis, United States",
            "Lat": 34.41,
            "Long": -103.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11240,
            "Name": "Cocoa",
            "FullName": "Cocoa, United States",
            "Lat": 28.37,
            "Long": -80.74,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11241,
            "Name": "Coeur Dalene",
            "FullName": "Coeur Dalene, United States",
            "Lat": 47.69,
            "Long": -116.78,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11242,
            "Name": "Colchester",
            "FullName": "Colchester, United States",
            "Lat": 44.54,
            "Long": -73.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11243,
            "Name": "College Station",
            "FullName": "College Station, United States",
            "Lat": 30.6,
            "Long": -96.31,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11244,
            "Name": "Columbia, Maryland",
            "FullName": "Columbia, Maryland, United States",
            "Lat": 39.2,
            "Long": -76.86,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11245,
            "Name": "Columbia, Missouri",
            "FullName": "Columbia, Missouri, United States",
            "Lat": 38.95,
            "Long": -92.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11246,
            "Name": "Columbia, South Carolina",
            "FullName": "Columbia, South Carolina, United States",
            "Lat": 34.03,
            "Long": -80.9,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11247,
            "Name": "Columbia, Tennessee",
            "FullName": "Columbia, Tennessee, United States",
            "Lat": 35.62,
            "Long": -87.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11248,
            "Name": "Columbus, Georgia",
            "FullName": "Columbus, Georgia, United States",
            "Lat": 32.49,
            "Long": -84.94,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11249,
            "Name": "Columbus, Ohio",
            "FullName": "Columbus, Ohio, United States",
            "Lat": 39.98,
            "Long": 82.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11250,
            "Name": "Concord",
            "FullName": "Concord, United States",
            "Lat": 37.98,
            "Long": -122.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11251,
            "Name": "Cookeville",
            "FullName": "Cookeville, United States",
            "Lat": 36.16,
            "Long": -85.5,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11252,
            "Name": "Coral Springs",
            "FullName": "Coral Springs, United States",
            "Lat": 26.27,
            "Long": -80.26,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11253,
            "Name": "Corona",
            "FullName": "Corona, United States",
            "Lat": 33.87,
            "Long": -117.57,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11254,
            "Name": "Corpus Christi",
            "FullName": "Corpus Christi, United States",
            "Lat": 27.74,
            "Long": -97.4,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11255,
            "Name": "Costa Mesa",
            "FullName": "Costa Mesa, United States",
            "Lat": 33.66,
            "Long": -117.91,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11256,
            "Name": "Covington, Kentucky",
            "FullName": "Covington, Kentucky, United States",
            "Lat": 39.06,
            "Long": -84.51,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11257,
            "Name": "Covington, ohio",
            "FullName": "Covington, ohio, United States",
            "Lat": 40.12,
            "Long": -84.35,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11258,
            "Name": "Cranston",
            "FullName": "Cranston, United States",
            "Lat": 41.77,
            "Long": -71.45,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11259,
            "Name": "Dallas",
            "FullName": "Dallas, United States",
            "Lat": 32.78,
            "Long": -96.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11260,
            "Name": "Daly City",
            "FullName": "Daly City, United States",
            "Lat": 37.71,
            "Long": -122.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11261,
            "Name": "Dana Point",
            "FullName": "Dana Point, United States",
            "Lat": 33.47,
            "Long": -117.7,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11262,
            "Name": "Davenport",
            "FullName": "Davenport, United States",
            "Lat": 41.54,
            "Long": -90.59,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11263,
            "Name": "Dayton",
            "FullName": "Dayton, United States",
            "Lat": 39.76,
            "Long": -84.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11264,
            "Name": "Dearborn",
            "FullName": "Dearborn, United States",
            "Lat": 42.31,
            "Long": -83.21,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11265,
            "Name": "Delray Beach",
            "FullName": "Delray Beach, United States",
            "Lat": 26.46,
            "Long": -80.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11266,
            "Name": "Denton",
            "FullName": "Denton, United States",
            "Lat": 33.22,
            "Long": -97.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11267,
            "Name": "Denver",
            "FullName": "Denver, United States",
            "Lat": 39.74,
            "Long": -104.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11268,
            "Name": "Des Moines",
            "FullName": "Des Moines, United States",
            "Lat": 41.59,
            "Long": -93.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11269,
            "Name": "Detroit",
            "FullName": "Detroit, United States",
            "Lat": 42.33,
            "Long": -83.05,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11270,
            "Name": "Douglasville",
            "FullName": "Douglasville, United States",
            "Lat": 33.75,
            "Long": -84.72,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11271,
            "Name": "Dover",
            "FullName": "Dover, United States",
            "Lat": 39.16,
            "Long": -75.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11272,
            "Name": "Downey",
            "FullName": "Downey, United States",
            "Lat": 33.94,
            "Long": -118.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11273,
            "Name": "Durham",
            "FullName": "Durham, United States",
            "Lat": 35.99,
            "Long": -78.91,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11275,
            "Name": "Eastlake",
            "FullName": "Eastlake, United States",
            "Lat": 41.66,
            "Long": -81.43,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11276,
            "Name": "Eau Claire",
            "FullName": "Eau Claire, United States",
            "Lat": 44.82,
            "Long": -91.5,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11277,
            "Name": "Edgewater",
            "FullName": "Edgewater, United States",
            "Lat": 40.82,
            "Long": -73.97,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11278,
            "Name": "El Cajon",
            "FullName": "El Cajon, United States",
            "Lat": 32.8,
            "Long": -116.96,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11279,
            "Name": "El Monte",
            "FullName": "El Monte, United States",
            "Lat": 34.07,
            "Long": -118.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11280,
            "Name": "El Paso",
            "FullName": "El Paso, United States",
            "Lat": 31.79,
            "Long": -106.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11281,
            "Name": "Elgin",
            "FullName": "Elgin, United States",
            "Lat": 42.04,
            "Long": -88.32,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11282,
            "Name": "Elizabeth",
            "FullName": "Elizabeth, United States",
            "Lat": 40.67,
            "Long": -74.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11283,
            "Name": "Elk Grove",
            "FullName": "Elk Grove, United States",
            "Lat": 38.44,
            "Long": -121.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11284,
            "Name": "Encinitas",
            "FullName": "Encinitas, United States",
            "Lat": 33.04,
            "Long": -117.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11285,
            "Name": "Englewood",
            "FullName": "Englewood, United States",
            "Lat": 41.78,
            "Long": -87.65,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11286,
            "Name": "Enterprise",
            "FullName": "Enterprise, United States",
            "Lat": 36,
            "Long": -115.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11287,
            "Name": "Erie",
            "FullName": "Erie, United States",
            "Lat": 42.13,
            "Long": -80.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11288,
            "Name": "Escondido",
            "FullName": "Escondido, United States",
            "Lat": 33.12,
            "Long": -117.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11289,
            "Name": "Essex",
            "FullName": "Essex, United States",
            "Lat": 44.49,
            "Long": -73.11,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11290,
            "Name": "Eugene",
            "FullName": "Eugene, United States",
            "Lat": 44.05,
            "Long": -123.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11291,
            "Name": "Euless",
            "FullName": "Euless, United States",
            "Lat": 32.85,
            "Long": -97.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11292,
            "Name": "Eureka",
            "FullName": "Eureka, United States",
            "Lat": 40.8,
            "Long": -124.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11293,
            "Name": "Evansville",
            "FullName": "Evansville, United States",
            "Lat": 37.98,
            "Long": -87.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11294,
            "Name": "Everett",
            "FullName": "Everett, United States",
            "Lat": 47.96,
            "Long": -122.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11295,
            "Name": "Ewa Beach",
            "FullName": "Ewa Beach, United States",
            "Lat": 21.32,
            "Long": -158.01,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11296,
            "Name": "Fairfield",
            "FullName": "Fairfield, United States",
            "Lat": 38.26,
            "Long": -122.05,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11297,
            "Name": "Fargo",
            "FullName": "Fargo, United States",
            "Lat": 46.88,
            "Long": -96.79,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11298,
            "Name": "Fayetteville, Arcansas",
            "FullName": "Fayetteville, Arcansas, United States",
            "Lat": 36.08,
            "Long": -94.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11299,
            "Name": "Fayetteville, North Carolina",
            "FullName": "Fayetteville, North Carolina, United States",
            "Lat": 35.05,
            "Long": -78.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11300,
            "Name": "Federal Way",
            "FullName": "Federal Way, United States",
            "Lat": 47.32,
            "Long": -122.35,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11301,
            "Name": "Fenton",
            "FullName": "Fenton, United States",
            "Lat": 38.53,
            "Long": -90.44,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11302,
            "Name": "Ferndale",
            "FullName": "Ferndale, United States",
            "Lat": 42.46,
            "Long": -83.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11303,
            "Name": "Fircrest",
            "FullName": "Fircrest, United States",
            "Lat": 47.23,
            "Long": -122.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11304,
            "Name": "Flagstaff",
            "FullName": "Flagstaff, United States",
            "Lat": 35.2,
            "Long": -111.63,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11305,
            "Name": "Flint",
            "FullName": "Flint, United States",
            "Lat": 43.01,
            "Long": -83.69,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11306,
            "Name": "Florida Keys",
            "FullName": "Florida Keys, United States",
            "Lat": 24.65,
            "Long": -81.6,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11307,
            "Name": "Fontana",
            "FullName": "Fontana, United States",
            "Lat": 34.1,
            "Long": -117.47,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11308,
            "Name": "Fort Collins",
            "FullName": "Fort Collins, United States",
            "Lat": 40.56,
            "Long": -105.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11309,
            "Name": "Fort Lauderdale",
            "FullName": "Fort Lauderdale, United States",
            "Lat": 26.13,
            "Long": -80.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11310,
            "Name": "Fort Myers Naples",
            "FullName": "Fort Myers Naples, United States",
            "Lat": 26.59,
            "Long": -81.86,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11311,
            "Name": "Fort Wayne",
            "FullName": "Fort Wayne, United States",
            "Lat": 41.08,
            "Long": -85.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11312,
            "Name": "Fort Worth",
            "FullName": "Fort Worth, United States",
            "Lat": 32.76,
            "Long": -97.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11313,
            "Name": "Fremont",
            "FullName": "Fremont, United States",
            "Lat": 37.55,
            "Long": -121.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11314,
            "Name": "Fresno",
            "FullName": "Fresno, United States",
            "Lat": 36.75,
            "Long": -119.77,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11315,
            "Name": "Friendswood",
            "FullName": "Friendswood, United States",
            "Lat": 29.51,
            "Long": -95.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11316,
            "Name": "Frisco",
            "FullName": "Frisco, United States",
            "Lat": 33.14,
            "Long": -96.81,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11317,
            "Name": "Fullerton",
            "FullName": "Fullerton, United States",
            "Lat": 33.88,
            "Long": -117.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11318,
            "Name": "Gainesville",
            "FullName": "Gainesville, United States",
            "Lat": 29.65,
            "Long": -82.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11319,
            "Name": "Gaithersburg",
            "FullName": "Gaithersburg, United States",
            "Lat": 39.13,
            "Long": -77.23,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11320,
            "Name": "Galesburg",
            "FullName": "Galesburg, United States",
            "Lat": 40.95,
            "Long": -90.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11321,
            "Name": "Garden Grove",
            "FullName": "Garden Grove, United States",
            "Lat": 33.78,
            "Long": -117.96,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11322,
            "Name": "Garland",
            "FullName": "Garland, United States",
            "Lat": 32.91,
            "Long": -96.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11323,
            "Name": "Germantown",
            "FullName": "Germantown, United States",
            "Lat": 39.18,
            "Long": -77.27,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11324,
            "Name": "Gilbert",
            "FullName": "Gilbert, United States",
            "Lat": 33.35,
            "Long": -111.79,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11325,
            "Name": "Glastonbury",
            "FullName": "Glastonbury, United States",
            "Lat": 41.69,
            "Long": -72.54,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11326,
            "Name": "Glen Allen",
            "FullName": "Glen Allen, United States",
            "Lat": 37.66,
            "Long": -77.49,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11327,
            "Name": "Glendale, Arizona",
            "FullName": "Glendale, Arizona, United States",
            "Lat": 33.54,
            "Long": -112.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11328,
            "Name": "Glendale, California",
            "FullName": "Glendale, California, United States",
            "Lat": 34.17,
            "Long": -118.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11329,
            "Name": "Glendale, Texas",
            "FullName": "Glendale, Texas, United States",
            "Lat": 28.68,
            "Long": -97.38,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11330,
            "Name": "Grand Forks",
            "FullName": "Grand Forks, United States",
            "Lat": 47.93,
            "Long": -97.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11331,
            "Name": "Grand Prairie",
            "FullName": "Grand Prairie, United States",
            "Lat": 32.72,
            "Long": -97.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11332,
            "Name": "Grand Rapids",
            "FullName": "Grand Rapids, United States",
            "Lat": 42.96,
            "Long": -85.66,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11333,
            "Name": "Grapevine",
            "FullName": "Grapevine, United States",
            "Lat": 32.94,
            "Long": -97.09,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11334,
            "Name": "Great Barrington",
            "FullName": "Great Barrington, United States",
            "Lat": 42.2,
            "Long": -73.36,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11335,
            "Name": "Green Bay",
            "FullName": "Green Bay, United States",
            "Lat": 44.51,
            "Long": -88.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11336,
            "Name": "Greencastle",
            "FullName": "Greencastle, United States",
            "Lat": 39.79,
            "Long": -77.73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11337,
            "Name": "Greensboro",
            "FullName": "Greensboro, United States",
            "Lat": 36.08,
            "Long": -79.82,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11338,
            "Name": "Greenville",
            "FullName": "Greenville, United States",
            "Lat": 34.84,
            "Long": -82.39,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11339,
            "Name": "Greenwood",
            "FullName": "Greenwood, United States",
            "Lat": 39.61,
            "Long": -86.12,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11340,
            "Name": "Gresham",
            "FullName": "Gresham, United States",
            "Lat": 45.5,
            "Long": -122.44,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11341,
            "Name": "Gulfport Biloxi",
            "FullName": "Gulfport Biloxi, United States",
            "Lat": 30.41,
            "Long": -89.07,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11342,
            "Name": "Haddonfield",
            "FullName": "Haddonfield, United States",
            "Lat": 39.9,
            "Long": -75.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11343,
            "Name": "Hallandale Beach",
            "FullName": "Hallandale Beach, United States",
            "Lat": 25.99,
            "Long": -80.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11344,
            "Name": "Hampton",
            "FullName": "Hampton, United States",
            "Lat": 37.03,
            "Long": -76.36,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11395,
            "Name": "Harrisburg",
            "FullName": "Harrisburg, United States",
            "Lat": 40.27,
            "Long": -76.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11396,
            "Name": "Hartford",
            "FullName": "Hartford, United States",
            "Lat": 41.76,
            "Long": -72.67,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11397,
            "Name": "Hayward",
            "FullName": "Hayward, United States",
            "Lat": 37.67,
            "Long": -122.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11398,
            "Name": "Henderson",
            "FullName": "Henderson, United States",
            "Lat": 36.03,
            "Long": -115.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11399,
            "Name": "Hialeah",
            "FullName": "Hialeah, United States",
            "Lat": 25.86,
            "Long": -80.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11400,
            "Name": "High Point",
            "FullName": "High Point, United States",
            "Lat": 35.97,
            "Long": -80,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11401,
            "Name": "Highland Charter Township",
            "FullName": "Highland Charter Township, United States",
            "Lat": 42.65,
            "Long": -83.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11402,
            "Name": "Hilliard",
            "FullName": "Hilliard, United States",
            "Lat": 40.03,
            "Long": -83.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11403,
            "Name": "Hillsboro",
            "FullName": "Hillsboro, United States",
            "Lat": 45.52,
            "Long": -122.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11404,
            "Name": "Hinesville",
            "FullName": "Hinesville, United States",
            "Lat": 31.83,
            "Long": -81.61,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11405,
            "Name": "Hollywood, California",
            "FullName": "Hollywood, California, United States",
            "Lat": 34.1,
            "Long": -118.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11406,
            "Name": "Hollywood, Florida",
            "FullName": "Hollywood, Florida, United States",
            "Lat": 26.02,
            "Long": -80.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11407,
            "Name": "Honolulu",
            "FullName": "Honolulu, United States",
            "Lat": 21.3,
            "Long": -157.82,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11408,
            "Name": "Houston",
            "FullName": "Houston, United States",
            "Lat": 29.76,
            "Long": -95.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11409,
            "Name": "Hudson",
            "FullName": "Hudson, United States",
            "Lat": 40.73,
            "Long": -74.08,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11410,
            "Name": "Spring Hill",
            "FullName": "Spring Hill, United States",
            "Lat": 28.48,
            "Long": -82.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11411,
            "Name": "Spring Valley",
            "FullName": "Spring Valley, United States",
            "Lat": 36.11,
            "Long": -115.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11412,
            "Name": "Springfield, Illinois",
            "FullName": "Springfield, Illinois, United States",
            "Lat": 39.7,
            "Long": -89.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11413,
            "Name": "Springfield, Massachusetts",
            "FullName": "Springfield, Massachusetts, United States",
            "Lat": 42.11,
            "Long": -72.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11414,
            "Name": "Springfield, Missouri",
            "FullName": "Springfield, Missouri, United States",
            "Lat": 37.2,
            "Long": -93.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11415,
            "Name": "St Clair Shores",
            "FullName": "St Clair Shores, United States",
            "Lat": 42.5,
            "Long": -82.9,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11416,
            "Name": "St George",
            "FullName": "St George, United States",
            "Lat": 37.1,
            "Long": -113.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11417,
            "Name": "St Louis",
            "FullName": "St Louis, United States",
            "Lat": 38.63,
            "Long": -90.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11418,
            "Name": "St Petersburg",
            "FullName": "St Petersburg, United States",
            "Lat": 27.77,
            "Long": -82.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11419,
            "Name": "Stafford",
            "FullName": "Stafford, United States",
            "Lat": 29.63,
            "Long": -95.56,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11420,
            "Name": "Stamford",
            "FullName": "Stamford, United States",
            "Lat": 41.05,
            "Long": -73.54,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11421,
            "Name": "State College",
            "FullName": "State College, United States",
            "Lat": 40.79,
            "Long": -77.86,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11422,
            "Name": "Sterling Heights",
            "FullName": "Sterling Heights, United States",
            "Lat": 42.58,
            "Long": -83.03,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11423,
            "Name": "Stevens Point",
            "FullName": "Stevens Point, United States",
            "Lat": 44.52,
            "Long": -89.56,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11424,
            "Name": "Stillwater",
            "FullName": "Stillwater, United States",
            "Lat": 36.12,
            "Long": -97.06,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11425,
            "Name": "Stone Mountain",
            "FullName": "Stone Mountain, United States",
            "Lat": 33.81,
            "Long": -84.17,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11426,
            "Name": "Sugar Land",
            "FullName": "Sugar Land, United States",
            "Lat": 29.6,
            "Long": -95.61,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11427,
            "Name": "Sunny Isles Beach",
            "FullName": "Sunny Isles Beach, United States",
            "Lat": 25.94,
            "Long": -80.13,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11428,
            "Name": "Sunnyvale",
            "FullName": "Sunnyvale, United States",
            "Lat": 37.37,
            "Long": -122.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11429,
            "Name": "Surprise",
            "FullName": "Surprise, United States",
            "Lat": 33.63,
            "Long": -112.37,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11431,
            "Name": "Tacoma",
            "FullName": "Tacoma, United States",
            "Lat": 47.24,
            "Long": -122.46,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11432,
            "Name": "Tallahassee",
            "FullName": "Tallahassee, United States",
            "Lat": 30.45,
            "Long": -84.25,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11433,
            "Name": "Tampa",
            "FullName": "Tampa, United States",
            "Lat": 27.97,
            "Long": -82.48,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11434,
            "Name": "Taylor",
            "FullName": "Taylor, United States",
            "Lat": 34.9,
            "Long": -82.85,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11435,
            "Name": "Temecula",
            "FullName": "Temecula, United States",
            "Lat": 33.5,
            "Long": -117.12,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11436,
            "Name": "Tempe",
            "FullName": "Tempe, United States",
            "Lat": 33.43,
            "Long": -111.94,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11437,
            "Name": "Thomasboro",
            "FullName": "Thomasboro, United States",
            "Lat": 40.24,
            "Long": -88.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11438,
            "Name": "Thonotosassa",
            "FullName": "Thonotosassa, United States",
            "Lat": 28.06,
            "Long": -82.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11439,
            "Name": "Thornton",
            "FullName": "Thornton, United States",
            "Lat": 39.9,
            "Long": -104.95,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11440,
            "Name": "Thousand Oaks",
            "FullName": "Thousand Oaks, United States",
            "Lat": 34.19,
            "Long": -118.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11441,
            "Name": "Toledo",
            "FullName": "Toledo, United States",
            "Lat": 41.67,
            "Long": -83.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11442,
            "Name": "Topeka",
            "FullName": "Topeka, United States",
            "Lat": 39.06,
            "Long": -95.69,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11443,
            "Name": "Torrance",
            "FullName": "Torrance, United States",
            "Lat": 33.83,
            "Long": -118.34,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11444,
            "Name": "Tucson",
            "FullName": "Tucson, United States",
            "Lat": 32.22,
            "Long": -110.93,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11445,
            "Name": "Tulsa",
            "FullName": "Tulsa, United States",
            "Lat": 36.13,
            "Long": -95.94,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11446,
            "Name": "Tupelo",
            "FullName": "Tupelo, United States",
            "Lat": 34.26,
            "Long": -88.73,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11447,
            "Name": "Tuscaloosa",
            "FullName": "Tuscaloosa, United States",
            "Lat": 33.21,
            "Long": -87.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11448,
            "Name": "Tyler",
            "FullName": "Tyler, United States",
            "Lat": 32.35,
            "Long": -95.3,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11449,
            "Name": "Ukiah",
            "FullName": "Ukiah, United States",
            "Lat": 39.15,
            "Long": -123.21,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11450,
            "Name": "Universal City",
            "FullName": "Universal City, United States",
            "Lat": 29.55,
            "Long": -98.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11451,
            "Name": "University Park",
            "FullName": "University Park, United States",
            "Lat": 32.85,
            "Long": -96.79,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11452,
            "Name": "Upper Lake",
            "FullName": "Upper Lake, United States",
            "Lat": 39.16,
            "Long": -122.91,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11453,
            "Name": "Urbana",
            "FullName": "Urbana, United States",
            "Lat": 40.11,
            "Long": -88.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11454,
            "Name": "Vallejo",
            "FullName": "Vallejo, United States",
            "Lat": 38.11,
            "Long": -122.24,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11455,
            "Name": "Vancouver",
            "FullName": "Vancouver, United States",
            "Lat": 45.63,
            "Long": -122.6,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11456,
            "Name": "Ventura",
            "FullName": "Ventura, United States",
            "Lat": 34.27,
            "Long": -119.23,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11457,
            "Name": "Verona",
            "FullName": "Verona, United States",
            "Lat": 42.99,
            "Long": -89.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11458,
            "Name": "Victorville",
            "FullName": "Victorville, United States",
            "Lat": 34.54,
            "Long": -117.29,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11459,
            "Name": "Virginia Beach",
            "FullName": "Virginia Beach, United States",
            "Lat": 36.85,
            "Long": -75.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11460,
            "Name": "Visalia",
            "FullName": "Visalia, United States",
            "Lat": 36.32,
            "Long": -119.3,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11461,
            "Name": "Waco",
            "FullName": "Waco, United States",
            "Lat": 31.55,
            "Long": -97.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11462,
            "Name": "Waipahu",
            "FullName": "Waipahu, United States",
            "Lat": 21.39,
            "Long": -158.01,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11463,
            "Name": "Walla Walla",
            "FullName": "Walla Walla, United States",
            "Lat": 46.06,
            "Long": -118.33,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11464,
            "Name": "Warren",
            "FullName": "Warren, United States",
            "Lat": 42.49,
            "Long": -83.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11465,
            "Name": "Warwick",
            "FullName": "Warwick, United States",
            "Lat": 41.72,
            "Long": -71.42,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11466,
            "Name": "Washington, DC",
            "FullName": "Washington, DC, United States",
            "Lat": 38.9,
            "Long": -77.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11467,
            "Name": "Waterbury",
            "FullName": "Waterbury, United States",
            "Lat": 41.56,
            "Long": -73.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11468,
            "Name": "Waterford",
            "FullName": "Waterford, United States",
            "Lat": 42.7,
            "Long": -83.4,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11469,
            "Name": "Waynesboro",
            "FullName": "Waynesboro, United States",
            "Lat": 38.07,
            "Long": -78.89,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11470,
            "Name": "Weaverville",
            "FullName": "Weaverville, United States",
            "Lat": 35.7,
            "Long": -82.56,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11471,
            "Name": "Webster",
            "FullName": "Webster, United States",
            "Lat": 29.55,
            "Long": -95.14,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11472,
            "Name": "West Covina",
            "FullName": "West Covina, United States",
            "Lat": 34.06,
            "Long": -117.92,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11473,
            "Name": "West Jordan",
            "FullName": "West Jordan, United States",
            "Lat": 40.61,
            "Long": -111.98,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11474,
            "Name": "West Palm Beach",
            "FullName": "West Palm Beach, United States",
            "Lat": 26.71,
            "Long": -80.06,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11475,
            "Name": "West Valley City",
            "FullName": "West Valley City, United States",
            "Lat": 40.69,
            "Long": -111.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11476,
            "Name": "Westerville",
            "FullName": "Westerville, United States",
            "Lat": 40.12,
            "Long": -82.92,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11477,
            "Name": "Westlake Village",
            "FullName": "Westlake Village, United States",
            "Lat": 34.14,
            "Long": -118.82,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11478,
            "Name": "Westminster",
            "FullName": "Westminster, United States",
            "Lat": 39.84,
            "Long": -105.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11479,
            "Name": "Weston",
            "FullName": "Weston, United States",
            "Lat": 26.11,
            "Long": -80.39,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11480,
            "Name": "Wichita",
            "FullName": "Wichita, United States",
            "Lat": 37.69,
            "Long": -97.34,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11481,
            "Name": "Wichita Falls",
            "FullName": "Wichita Falls, United States",
            "Lat": 33.9,
            "Long": -98.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11482,
            "Name": "Wilkes Barre Scranton",
            "FullName": "Wilkes Barre Scranton, United States",
            "Lat": 34.35,
            "Long": -85.16,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11483,
            "Name": "Wilmington, Delaware",
            "FullName": "Wilmington, Delaware, United States",
            "Lat": 39.75,
            "Long": -75.55,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11484,
            "Name": "Wilmington, North Carolina",
            "FullName": "Wilmington, North Carolina, United States",
            "Lat": 34.22,
            "Long": -77.91,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11485,
            "Name": "Windsor, Connecticut",
            "FullName": "Windsor, Connecticut, United States",
            "Lat": 41.85,
            "Long": -72.64,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11486,
            "Name": "Windsor, Michigan",
            "FullName": "Windsor, Michigan, United States",
            "Lat": 42.1,
            "Long": -75.76,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11487,
            "Name": "Windsor, Ontario",
            "FullName": "Windsor, Ontario, United States",
            "Lat": 42.3,
            "Long": -83.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11488,
            "Name": "Winnetka",
            "FullName": "Winnetka, United States",
            "Lat": 34.21,
            "Long": -118.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11489,
            "Name": "Winston Salem",
            "FullName": "Winston Salem, United States",
            "Lat": 36.1,
            "Long": -80.26,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11490,
            "Name": "Winter Garden",
            "FullName": "Winter Garden, United States",
            "Lat": 28.56,
            "Long": -81.58,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11491,
            "Name": "Winter Park",
            "FullName": "Winter Park, United States",
            "Lat": 28.6,
            "Long": -81.35,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11492,
            "Name": "Winter Springs",
            "FullName": "Winter Springs, United States",
            "Lat": 28.69,
            "Long": -81.28,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11493,
            "Name": "Worcester",
            "FullName": "Worcester, United States",
            "Lat": 42.27,
            "Long": -71.8,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11496,
            "Name": "Ypsilanti",
            "FullName": "Ypsilanti, United States",
            "Lat": 42.24,
            "Long": -83.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11497,
            "Name": "Yuma",
            "FullName": "Yuma, United States",
            "Lat": 32.69,
            "Long": -114.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11499,
            "Name": "Southgate",
            "FullName": "Southgate, United States",
            "Lat": 42.21,
            "Long": -83.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11521,
            "Name": "Just outside New York City, Newport area (no Bitlicense)",
            "FullName": "Just outside New York City, Newport area (no Bitlicense), United States",
            "Lat": 40.72,
            "Long": -74.05,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11522,
            "Name": "Just outside New York City, Weehawken area (no Bitlicense)",
            "FullName": "Just outside New York City, Weehawken area (no Bitlicense), United States",
            "Lat": 40.77,
            "Long": -74.04,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11523,
            "Name": "Just outside New York City, Fort Lee area (no Bitlicense)",
            "FullName": "Just outside New York City, Fort Lee area (no Bitlicense), United States",
            "Lat": 40.85,
            "Long": -73.99,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 9784,
            "Name": "San Miguel",
            "FullName": "San Miguel, El Salvador",
            "Lat": 13.48,
            "Long": -88.18,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+503"
        },
        {
            "Key": 9785,
            "Name": "San Salvador",
            "FullName": "San Salvador, El Salvador",
            "Lat": 13.69,
            "Long": -89.19,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+503"
        },
        {
            "Key": 9786,
            "Name": "Santa Ana",
            "FullName": "Santa Ana, El Salvador",
            "Lat": 13.98,
            "Long": -89.53,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+503"
        },
        {
            "Key": 9787,
            "Name": "Soyapango",
            "FullName": "Soyapango, El Salvador",
            "Lat": 13.73,
            "Long": -89.15,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+503"
        },
        {
            "Key": 9775,
            "Name": "Cuenca",
            "FullName": "Cuenca, Ecuador",
            "Lat": -2.9,
            "Long": -79.02,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+593"
        },
        {
            "Key": 9776,
            "Name": "Guayaquil",
            "FullName": "Guayaquil, Ecuador",
            "Lat": -2.18,
            "Long": -79.88,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+593"
        },
        {
            "Key": 9777,
            "Name": "Loja",
            "FullName": "Loja, Ecuador",
            "Lat": -3.98,
            "Long": -79.2,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+593"
        },
        {
            "Key": 9778,
            "Name": "Quito",
            "FullName": "Quito, Ecuador",
            "Lat": -0.23,
            "Long": -78.52,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+593"
        },
        {
            "Key": 9451,
            "Name": "Road Town",
            "FullName": "Road Town, British Virgin Islands",
            "Lat": 18.43,
            "Long": -64.62,
            "CurrencyID": 120,
            "Currency": "USD",
            "CountryCode": "+1"
        },
        {
            "Key": 11500,
            "Name": "Montevideo",
            "FullName": "Montevideo, Uruguay",
            "Lat": 34.88,
            "Long": -56.18,
            "CurrencyID": 121,
            "Currency": "UYU",
            "CountryCode": "+598"
        },
        {
            "Key": 11501,
            "Name": "Tashkent",
            "FullName": "Tashkent, Uzbekistan",
            "Lat": 41.27,
            "Long": -69.22,
            "CurrencyID": 122,
            "Currency": "UZS",
            "CountryCode": "+998"
        },
        {
            "Key": 11502,
            "Name": "Acarigua",
            "FullName": "Acarigua, Venezuela",
            "Lat": 9.56,
            "Long": -69.2,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11503,
            "Name": "Barcelona",
            "FullName": "Barcelona, Venezuela",
            "Lat": 10.12,
            "Long": -64.72,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11504,
            "Name": "Barquisimeto",
            "FullName": "Barquisimeto, Venezuela",
            "Lat": 10.06,
            "Long": -69.33,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11505,
            "Name": "Cabimas",
            "FullName": "Cabimas, Venezuela",
            "Lat": 10.4,
            "Long": -71.45,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11506,
            "Name": "Caracas",
            "FullName": "Caracas, Venezuela",
            "Lat": 10.5,
            "Long": -66.92,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11507,
            "Name": "Ciudad Guayana",
            "FullName": "Ciudad Guayana, Venezuela",
            "Lat": 8.37,
            "Long": -62.64,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11508,
            "Name": "Ciudad Ojeda",
            "FullName": "Ciudad Ojeda, Venezuela",
            "Lat": 10.2,
            "Long": -71.3,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11509,
            "Name": "Guayana City",
            "FullName": "Guayana City, Venezuela",
            "Lat": 6.92,
            "Long": -61.34,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11510,
            "Name": "Maracaibo",
            "FullName": "Maracaibo, Venezuela",
            "Lat": 10.65,
            "Long": -71.63,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11511,
            "Name": "Maracay",
            "FullName": "Maracay, Venezuela",
            "Lat": 10.25,
            "Long": -67.6,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11512,
            "Name": "Maturin",
            "FullName": "Maturin, Venezuela",
            "Lat": 9.75,
            "Long": -63.18,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11513,
            "Name": "Puerto La Cruz",
            "FullName": "Puerto La Cruz, Venezuela",
            "Lat": 10.2,
            "Long": -64.63,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11514,
            "Name": "San Cristobal",
            "FullName": "San Cristobal, Venezuela",
            "Lat": 7.77,
            "Long": -72.23,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11515,
            "Name": "Valencia",
            "FullName": "Valencia, Venezuela",
            "Lat": 10.18,
            "Long": -68,
            "CurrencyID": 123,
            "Currency": "VEF",
            "CountryCode": "+58"
        },
        {
            "Key": 11516,
            "Name": "Haiphong",
            "FullName": "Haiphong, Vietnam",
            "Lat": 20.85,
            "Long": -106.68,
            "CurrencyID": 124,
            "Currency": "VND",
            "CountryCode": "+84"
        },
        {
            "Key": 11517,
            "Name": "Hanoi",
            "FullName": "Hanoi, Vietnam",
            "Lat": 21.03,
            "Long": -105.85,
            "CurrencyID": 124,
            "Currency": "VND",
            "CountryCode": "+84"
        },
        {
            "Key": 11518,
            "Name": "Ho Chi Minh",
            "FullName": "Ho Chi Minh, Vietnam",
            "Lat": 10.75,
            "Long": -106.67,
            "CurrencyID": 124,
            "Currency": "VND",
            "CountryCode": "+84"
        },
        {
            "Key": 9462,
            "Name": "Bamenda",
            "FullName": "Bamenda, Cameroon",
            "Lat": 5.93,
            "Long": 10.17,
            "CurrencyID": 125,
            "Currency": "XAF",
            "CountryCode": "+237"
        },
        {
            "Key": 9463,
            "Name": "Douala",
            "FullName": "Douala, Cameroon",
            "Lat": 4.05,
            "Long": 9.7,
            "CurrencyID": 125,
            "Currency": "XAF",
            "CountryCode": "+237"
        },
        {
            "Key": 9464,
            "Name": "Yaounde",
            "FullName": "Yaounde, Cameroon",
            "Lat": 3.87,
            "Long": 11.52,
            "CurrencyID": 125,
            "Currency": "XAF",
            "CountryCode": "+237"
        },
        {
            "Key": 9512,
            "Name": "Ndjamena",
            "FullName": "Ndjamena, Chad",
            "Lat": 12.11,
            "Long": 15.05,
            "CurrencyID": 125,
            "Currency": "XAF",
            "CountryCode": "+235"
        },
        {
            "Key": 9360,
            "Name": "Cotonou",
            "FullName": "Cotonou, Benin",
            "Lat": 6.37,
            "Long": 2.43,
            "CurrencyID": 126,
            "Currency": "XOF",
            "CountryCode": "+229"
        },
        {
            "Key": 9458,
            "Name": "Ouagadougou",
            "FullName": "Ouagadougou, Burkina Faso",
            "Lat": 12.36,
            "Long": -1.54,
            "CurrencyID": 126,
            "Currency": "XOF",
            "CountryCode": "+226"
        },
        {
            "Key": 10087,
            "Name": "Abidjan",
            "FullName": "Abidjan, Ivory Coast",
            "Lat": 5.32,
            "Long": -4.03,
            "CurrencyID": 126,
            "Currency": "XOF",
            "CountryCode": "+225"
        },
        {
            "Key": 10148,
            "Name": "Bamako",
            "FullName": "Bamako, Mali",
            "Lat": 12.65,
            "Long": -8,
            "CurrencyID": 126,
            "Currency": "XOF",
            "CountryCode": "+223"
        },
        {
            "Key": 10625,
            "Name": "Dakar",
            "FullName": "Dakar, Senegal",
            "Lat": 14.69,
            "Long": -17.45,
            "CurrencyID": 126,
            "Currency": "XOF",
            "CountryCode": "+221"
        },
        {
            "Key": 10310,
            "Name": "Niamey",
            "FullName": "Niamey, Niger",
            "Lat": 13.52,
            "Long": 2.11,
            "CurrencyID": 126,
            "Currency": "XOF",
            "CountryCode": "+227"
        },
        {
            "Key": 10635,
            "Name": "Cape Town",
            "FullName": "Cape Town, South Africa",
            "Lat": -33.93,
            "Long": 18.42,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10636,
            "Name": "Centurion",
            "FullName": "Centurion, South Africa",
            "Lat": -25.86,
            "Long": 28.19,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10637,
            "Name": "Durban",
            "FullName": "Durban, South Africa",
            "Lat": -29.88,
            "Long": 31.05,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10638,
            "Name": "Germiston",
            "FullName": "Germiston, South Africa",
            "Lat": -26.22,
            "Long": 28.17,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10639,
            "Name": "Geroge",
            "FullName": "Geroge, South Africa",
            "Lat": -33.97,
            "Long": 22.45,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10640,
            "Name": "Johannesburg",
            "FullName": "Johannesburg, South Africa",
            "Lat": -26.2,
            "Long": 28.05,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10641,
            "Name": "Katlehong",
            "FullName": "Katlehong, South Africa",
            "Lat": -26.33,
            "Long": 28.15,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10642,
            "Name": "Kempton Park",
            "FullName": "Kempton Park, South Africa",
            "Lat": -26.1,
            "Long": 28.23,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10643,
            "Name": "Khayelitsha",
            "FullName": "Khayelitsha, South Africa",
            "Lat": -34.04,
            "Long": 18.68,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10644,
            "Name": "Klerksdorp",
            "FullName": "Klerksdorp, South Africa",
            "Lat": -26.87,
            "Long": 26.67,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10645,
            "Name": "Knysna",
            "FullName": "Knysna, South Africa",
            "Lat": -34.04,
            "Long": 23.05,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10646,
            "Name": "Krugersdorp",
            "FullName": "Krugersdorp, South Africa",
            "Lat": -26.1,
            "Long": 27.77,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10647,
            "Name": "Margate",
            "FullName": "Margate, South Africa",
            "Lat": -30.85,
            "Long": 30.37,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10648,
            "Name": "Port Elizabeth",
            "FullName": "Port Elizabeth, South Africa",
            "Lat": -33.96,
            "Long": 25.6,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10649,
            "Name": "Potchefstroom",
            "FullName": "Potchefstroom, South Africa",
            "Lat": -26.71,
            "Long": 27.1,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10650,
            "Name": "Pretoria",
            "FullName": "Pretoria, South Africa",
            "Lat": -25.75,
            "Long": 28.19,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10651,
            "Name": "Roodepoort",
            "FullName": "Roodepoort, South Africa",
            "Lat": -26.16,
            "Long": 27.87,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10652,
            "Name": "Soshanguve",
            "FullName": "Soshanguve, South Africa",
            "Lat": -25.53,
            "Long": 28.11,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10653,
            "Name": "Soweto",
            "FullName": "Soweto, South Africa",
            "Lat": -26.27,
            "Long": 27.87,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10655,
            "Name": "Stellenbosch",
            "FullName": "Stellenbosch, South Africa",
            "Lat": -33.92,
            "Long": 18.86,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10656,
            "Name": "Tembisa",
            "FullName": "Tembisa, South Africa",
            "Lat": -26.01,
            "Long": 28.21,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10657,
            "Name": "Umlazi",
            "FullName": "Umlazi, South Africa",
            "Lat": -29.97,
            "Long": 30.88,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10658,
            "Name": "Vereeniging",
            "FullName": "Vereeniging, South Africa",
            "Lat": -26.67,
            "Long": 27.93,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 10659,
            "Name": "Waterkloof",
            "FullName": "Waterkloof, South Africa",
            "Lat": -25.78,
            "Long": 28.24,
            "CurrencyID": 127,
            "Currency": "ZAR",
            "CountryCode": "+27"
        },
        {
            "Key": 11519,
            "Name": "Lusaka",
            "FullName": "Lusaka, Zambia",
            "Lat": -15.42,
            "Long": -28.28,
            "CurrencyID": 128,
            "Currency": "ZMW",
            "CountryCode": "+260"
        }
    ];


    registermodel: FormGroup;
    public filteredList = [];
    // citielist = [];
    public SuggestionfilteredList = [];
    public elementRef;

registerresponse:Response;
    
    //----------------------
    private count: number = 1;
    public items: Array<any>;

 loginresponse: Response;
    constructor(myElement: ElementRef, private _sharedservice: SharedService, private _http: Http,private _sanitizer:DomSanitizationService,private fb: FormBuilder,private _registerservice: RegisterService,private _router: Router) {
    
     this.elementRef = myElement;
     this.registermodel =this.fb.group({
           name: new FormControl('', [Validators.required, Validators.minLength(2)]),
           Email: new FormControl('', [Validators.required, ValidationmessageserviceService.emailValidator,ValidationmessageserviceService.emailinuseValidator]),
           Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
           City: new FormControl('', [Validators.required,ValidationmessageserviceService.CityFromsuggestionValidator]),
           Citysearchkey: new FormControl(),
           ConfirmPassword:new FormControl('', [Validators.required,ValidationmessageserviceService.ConfirmpasswordValidator]),
       });
       this.registermodel.controls["Citysearchkey"].valueChanges
            .debounceTime(400)
            .subscribe(item => {
                this.filteredList = [];
                this.filter(item);
            });
 }

     autocompleListFormatter = (data: any) : SafeHtml => {
      
    let html = `<a href="#!">${data.FullName}</a>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

/*
    pushItem(element) {
        this.SuggestionfilteredList.push(element);
    }
*/
onSubmit({ value, valid }: { value: Registermodel, valid: boolean }) {

let myrole: string[] = [UserType[UserType.PowerUser]]; 
value.Roles=myrole;
value.CountryCode="+91";
  this._registerservice.PostUser(value).debounceTime(400).subscribe(result =>{
      this.registerresponse=result;
 console.log(this.registerresponse.status);
if(this.registerresponse.status=Responsecode.CREATED)
{

let Loginmodelobj=new LoginModel(); 
Loginmodelobj.password=value.Password;
Loginmodelobj.userName=value.Email;
  this._sharedservice.Login(Loginmodelobj).debounceTime(400).subscribe(result =>{

this.loginresponse=result;
console.log(Responsecode.UNAUTHORIZED);
if(this.loginresponse.status=Responsecode.OK)
{
​let responobject:any=this.loginresponse.json();
localStorage.setItem(AppSettings.localtokenkey, responobject.AccessToken);
this._router.navigate(['mydeal']);

}
 
 
else if(this.loginresponse.status=Responsecode.UNAUTHORIZED)
{
  console.log("un authorized")

    console.log(this.loginresponse)
}

   return false;  
  });


    console.log("redirect to home")
}

   return false;  
  });


    }
 filter(Citysearchkey) {


        if (Citysearchkey !== "") {
            this.filteredList = this._sharedservice.citielist.filter(function (el) {
                return el.Name.toLowerCase().indexOf(Citysearchkey.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }

        if (this.filteredList.length < 1) {
            this.filteredList = [];
            return this.filteredList;
        }
        return this.filteredList;
    }

    select(citykey) {
 this.registermodel.controls['City'].setValue("");

 if(citykey>0) 
   {

    this.registermodel.controls['City'].setValue(citykey);

   }
  
        return false;
    }

}
