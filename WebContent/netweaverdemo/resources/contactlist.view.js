jQuery.sap.require("netweaverdemo.resources.utils.utility");

sap.ui.jsview("netweaverdemo.resources.contactlist", {

      getControllerName : function() {
         return "netweaverdemo.resources.contactlist";
    	 
      },
      
      createContent : function(oController) {
		var oShell = this.createShell(); 
		oShell.addContent(this.create_bar(oController));		
       	oShell.addContent(this.createZnwgwdemoTable());	
       	return oShell;       	
      },
        
      create_bar: function(oController){	
  	  	var bar = new sap.ui.commons.Toolbar("ID_TOOLBAR"); 
    	var button_create = new sap.ui.commons.Button("ID_BUT_CREATE",{text: oBundle.getText("BUTTON_CREATE"), style: sap.ui.commons.ButtonStyle.Accept, press: function(){oController.onContactCreate();}});
    	var button_update = new sap.ui.commons.Button("ID_BUT_UPDATE",{text: oBundle.getText("BUTTON_UPDATE"), style: sap.ui.commons.ButtonStyle.Emph, press: function(){oController.onContactUpdate();}});
    	var button_delete = new sap.ui.commons.Button("ID_BUT_DELETE",{text: oBundle.getText("BUTTON_DELETE"), style: sap.ui.commons.ButtonStyle.Reject, press: function(){oController.onContactDelete();}});
    	bar.addItem(button_create);
    	bar.addItem(button_update);
    	bar.addItem(button_delete);     
    	return bar;
      },      
      
      createShell:function(oController){
      
    	  var oShell = sap.ui.ux3.Shell("ID_ZNWGWDEMOShell",{
    	      appIcon: "images/SAPLogo.gif",
    		  appTitle: oBundle.getText("APP_TITLE"),
    		  showLogoutButton:false,
    		  showSearchTool: false,
    		  showInspectorTool: false,
    		  showFeederTool: false,
    		  worksetItems: [new sap.ui.ux3.NavigationItem("navItemList",{key: "ZNWGWDEMOList",text:oBundle.getText("WORKSET_TITLE")})]
    	  });
    	  return oShell;
      },      
      
      createZnwgwdemoTable:function(){
      
    	var oTable = new sap.ui.table.Table("ID_ZNWGWDEMOTable", {
    		visibleRowCount  : 20,
  			selectionMode: sap.ui.table.SelectionMode.Single
  		});
    	
 
     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("ZNWGWDEMO_ADDRESSNUMBER")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "AddressNumber"),
			sortProperty: "AddressNumber",
			filterProperty: "AddressNumber"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("ZNWGWDEMO_LASTNAME")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "LastName"),
			sortProperty: "LastName",
			filterProperty: "LastName"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("ZNWGWDEMO_FIRSTNAME")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "FirstName"),
			sortProperty: "FirstName",
			filterProperty: "FirstName"
 		}));

     	 oTable.addColumn(new sap.ui.table.Column({
    	 	label: new sap.ui.commons.Label({text:oBundle.getText("ZNWGWDEMO_EMAIL")}),
 			template: new sap.ui.commons.TextView().bindProperty("text", "eMail"),
			sortProperty: "eMail",
			filterProperty: "eMail"
 		}));
 		return oTable;
      }
      
});
