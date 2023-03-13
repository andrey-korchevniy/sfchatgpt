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
  
    // connectedCallback() {
    //     this.data = generateData({ amountOfRecords: 100 });
    // }

    // increaseRowOffset() {
    //     this.rowOffset += 100;
    // }
  
    // refreshRecords() {
    //     return refreshApex(this.wiredRecords);
    // }
  
//   set recordIdList(apiName) {
  
// }

}