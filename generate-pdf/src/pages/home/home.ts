import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';
// https://ionicframework.com/docs/v3/native/file/


//lembrar de forcar "html2canvas": "1.0.0-rc.1", no package.json
//https://github.com/MarouaneSH/Ionic-jsPdf-Html2Canvas

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private file: File) {

  }

  generatePdf(){
    const div = document.getElementById("Html2Pdf");
    const options = {backgroud:"white",height:div.clientHeight, width: div.clientWidth}
    html2canvas(div, options).then((canvas)=>{
      var doc = new jsPDF("p", "mm", "a4");
      let imgData = canvas.toDataURL("image/PNG");
      doc.addImage(imgData, 'PNG', 20,20);

      let pdfOutput = doc.output();

      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);

      for (let i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);        
      }

      const directory = this.file.externalApplicationStorageDirectory;

      const fileName = "example.pdf";

      this.file.writeFile(directory,fileName,buffer)
      .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
      .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));

    })
  }

}
