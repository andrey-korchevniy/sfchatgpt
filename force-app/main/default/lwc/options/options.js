import { LightningElement, wire, track } from 'lwc';
import getObjectList from '@salesforce/apex/SchemaController.getObjectList';

export default class Options extends LightningElement {
    @track items = [];
    @track searchText = '';

    @wire(getObjectList)
    objectList;

    //* связь с АРЕХ контроллером для получения списка объектов пользователя
    connectedCallback() {
        getObjectList()
            .then(result => {
                console.log('результат Ответа АРЕХ контроллера, список объектов--->', result);
                this.items = result.map(item => ({ label: item.label, apiName: item.apiName, selected: '' }));
            })
            .catch(error => {
                console.error('ошибка вызова АРЕХ контроллера, список объектов', error);
            });
    }

    //* обработка списка по результату поиска
    get filteredItems() {
        if (!this.searchText) {
            return this.items.sort((a, b) => (a.label > b.label) ? 1 : -1);;
        }
        const regex = new RegExp(this.searchText, 'i');
        return this.items.filter(item => item.label.match(regex)).sort((a, b) => (a.label > b.label) ? 1 : -1);
    }

    //* обработка отображения поискового запроса
    handleSearchChange(event) {
        this.searchText = event.target.value;
    }

    //* обработка клика по объекту
    handleItemClick(event) {
        const apiName = event.currentTarget.dataset.value;
        this.items = this.items.map(item => {
            item.selected = (item.apiName === apiName) ? 'selected' : '';
            return item;
        });
        const itemClickEvent = new CustomEvent('itemclick', { detail: apiName });
        this.dispatchEvent(itemClickEvent);
    }
}