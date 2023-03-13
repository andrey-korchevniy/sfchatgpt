public with sharing class GetData {
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAllRecords(String objectApiName) {
        // Получаем список имен полей объекта по его API имени
        List<String> fieldNames = new List<String>();
        Map<String, Schema.SObjectField> fieldsMap = Schema.getGlobalDescribe().get(objectApiName).getDescribe().fields.getMap();
        for (String fieldName : fieldsMap.keySet()) {
            fieldNames.add(fieldName);
        }

        // Соединяем имена полей в строку с запятыми
        String fields = String.join(fieldNames, ',');

        // Выполняем динамический SOQL запрос для выбора всех полей объекта
        return Database.query('SELECT ' + fields + ' FROM ' + objectApiName);
    }
}
