public with sharing class SchemaController {

    @AuraEnabled(cacheable=true)
    public static List<ObjectInfo> getObjectList() {
        List<ObjectInfo> objList = new List<ObjectInfo>();
        for (Schema.SObjectType objType : Schema.getGlobalDescribe().values()) {
            String objectName = objType.getDescribe().getName();
            if (objType.getDescribe().isQueryable() && objType.getDescribe().isAccessible() && objType.getDescribe().isSearchable()) {
                ObjectInfo objInfo = new ObjectInfo();
                objInfo.label = objType.getDescribe().getLabel();
                objInfo.apiName = objType.getDescribe().getName();
                objList.add(objInfo);
            }
        }
        return objList;
    }

    public class ObjectInfo {
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String apiName {get; set;}
    }
}
