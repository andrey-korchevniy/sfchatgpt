import { LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];
import getAllRecords from '@salesforce/apex/GetData.getAllRecords';

export default class Selector extends LightningElement {
    selectedObject;
    userId = Id;

    @wire(getRecord, { recordId: '$userId', fields })
    user;

    //* обработка всплывшего события из списка выбора
    handleOptionSelected(ev) {
        this.selectedObject = ev.detail;
    }

    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }
}