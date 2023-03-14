import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo, getRecords, getPicklistValues } from 'lightning/uiObjectInfoApi';
import getAllRecords from '@salesforce/apex/GetData.getAllRecords';

export default class List extends LightningElement {
  @api apiName;
  data = [];
  columns;
  isData = false;
  title = 'Select an Object';
  rowOffset = 0;
  
  //* получаем шапку таблицы
    @wire(getObjectInfo, { objectApiName: '$apiName' })
    objectInfo({ error, data }) {
      this.title = `Available for ${this.apiName}`
      this.isData = true;
      console.log('idList ------------> ', this.idList);
      if (data) {
        const fieldInfos = data.fields;
            const columnArray = [];
        Object.keys(fieldInfos).forEach(field => {
              columnArray.push({ label: fieldInfos[field].label, fieldName: field });
        });
        this.columns = columnArray; 
      } else if (error) {
        this.isData = false;
        this.title = 'This object has no fields'
        console.error(error);
      }      
    }

  //* получаем записи из контроллера
    @wire(getAllRecords, { objectApiName: '$apiName' })
    wiredRecords(result) {
      if (result && result.data) {
        this.data = result.data;
        console.log('--> записи АРЕХ контроллера в лист --->', result.data);
      }
    }

  handleClick() {
    console.log('***** создание CSV ********');
    if (this.column)
      //* Создание заголовка CSV файла
    try {
          const csvHeader =columns.join(",") + "\n";
    console.log('columns========>', csvHeader);
    } catch (error) {
      console.log('error ============<', error);
    }


      //* Создание строк CSV файла
      const csvRows = this.data.map((record) =>
        Object.values(record).map((value) => `"${value}"`).join(",") + "\n"
      ).join("");


      //* Конкатенация заголовка и строк CSV файла
      const csvContent = csvHeader + csvRows;
      console.log('csvContent ====>', csvContent);

      //* Создание объекта Blob из текстового содержимого CSV файла
      const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
      //* Создание ссылки на скачивание CSV файла
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(csvBlob);
      downloadLink.download = "records.csv";
      downloadLink.click();

    }
  
}