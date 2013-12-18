sap.ui.controller("netweaverdemo.resources.contactlist", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers, and to do other one-time initializations.
	 */
	onInit: function() {
		
		jQuery.sap.require("netweaverdemo.resources.utils.connectivity");
		
		var oModel = new sap.ui.model.odata.ODataModel(serviceUrl,true,"BELLET","1sjus7m3"); 
		sap.ui.getCore().setModel(oModel);
		
//		oModel.attachRequestCompleted(function(oEvent){
			
//		});
		
		oModel.attachRequestFailed(function(oEvent){
			displayError({
				message: oEvent.getParameter("message"),
				responseText:oEvent.getParameter("responseText"), 
				statusCode:oEvent.getParameter("statusCode"), 
				statusText:oEvent.getParameter("statusText")
			});
		});


		oModel.attachParseError(function(oEvent){
			displayError({
				message: oEvent.getParameter("message"),
				responseText:oEvent.getParameter("responseText"), 
				statusCode:oEvent.getParameter("statusCode"), 
				statusText:oEvent.getParameter("statusText")
			});
		});

//		oModel.attachRequestSent(function(){

//		});	
				
		this.displayZnwgwdemo(oModel);
	
	},
	
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},


	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
//	onAfterRendering: function() {

//	},


	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
//	onExit: function() {

//	}	
	

	displayZnwgwdemo:function(oModel){
		
		var oTable = sap.ui.getCore().byId("ID_ZNWGWDEMOTable");
		oTable.setModel(oModel);
		oTable.bindRows("/ZNWGWDEMOCollection");
	},

	onContactUpdate:function(){
			 	  		  
	  var oTable = sap.ui.getCore().byId("ID_ZNWGWDEMOTable");	
	  
	  if (oTable.getSelectedIndex() < 0) 
	   { alert("No row selected"); }	  
	  else
		{ var oModel = sap.ui.getCore().getModel(); 
	      var selRowContext = oTable.getContextByIndex(oTable.getSelectedIndex());	  	  
	      var oDialog = new sap.ui.commons.Dialog("ID_UPDATE", {modal: true, closed: function(oControlEvent){sap.ui.getCore().getElementById("ID_UPDATE").destroy();}});	  
	      oDialog.addContent(this.rowPopupLayoutPrepare(oModel.getProperty("LastName", selRowContext),oModel.getProperty("FirstName", selRowContext),oModel.getProperty("eMail", selRowContext)));	 		  
	      oDialog.addButton(new sap.ui.commons.Button({text: "OK", press: function()
		    { var lastname  = sap.ui.getCore().getElementById('ID_TXT_LAST').getValue(); 
		      var firstname = sap.ui.getCore().getElementById('ID_TXT_FIRST').getValue();
		      var email     = sap.ui.getCore().getElementById('ID_TXT_EMAIL').getValue();		
			  var oModel = sap.ui.getCore().getModel(); 			    
		      var oEntry = {AddressNumber:oModel.getProperty("AddressNumber", selRowContext),LastName:lastname,FirstName:firstname,eMail:email};
		      oModel.refreshSecurityToken(null, null, false) ;
			  var oTable = sap.ui.getCore().byId("ID_ZNWGWDEMOTable");
			  var selKey = oTable.getContextByIndex(oTable.getSelectedIndices());  
			  var oPath = escape(selKey).replace("%28%27","(\'").replace("%27%29","\')");				
			  oModel.read(oPath, null, null, true, function(oData, oResponse){ oModel.oHeaders["x-csrf-token"] = oResponse.headers['x-csrf-token']; },function(){alert("xcsrf Read failed");});				   
		      var oParams = {};
		      oParams.fnSuccess = function(){ alert("Update successful");};
		      oParams.fnError = function(){alert("Update failed");};
		      oParams.bMerge = true;			   
			  oModel.update(oPath, oEntry, oParams);			
		      sap.ui.getCore().getElementById('ID_UPDATE').destroy(); }}));	 	 
		  oDialog.setTitle("Update Contact");	  
		  oDialog.open(); }		
	},	
	
	onContactDelete:function(){					
	      	  
		var oModel = sap.ui.getCore().getModel(); 	
		oModel.refreshSecurityToken(null, null, false); 	  		  
		var oTable = sap.ui.getCore().byId("ID_ZNWGWDEMOTable");
		if (oTable.getSelectedIndex() < 0) 
		  { alert("No row selected"); }
		else
		  { var selKey = oTable.getContextByIndex(oTable.getSelectedIndices());		
		    var oPath = escape(selKey).replace("%28%27","(\'").replace("%27%29","\')");
		    oModel.read(oPath, null, null, true, function(oData, oResponse){ oModel.oHeaders["x-csrf-token"] = oResponse.headers['x-csrf-token']; },function(){alert("xcsrf Read failed");});		  
		    var oParams = {};
	    	oParams.fnSuccess = function(){alert("Delete successful");};
		    oParams.fnError = function(){alert("Delete failed");};	  
		    oModel.remove(oPath, oParams); }
	},	
	
	rowPopupLayoutPrepare:function(LastName,FirstName,eMail){
		
		  var oLayout = new sap.ui.commons.layout.MatrixLayout({columns: 2, width: "100%"});	
		  
		  var oTF = new sap.ui.commons.TextField("ID_TXT_LAST", {tooltip: 'LastName', editable: true, width: '200px', value: LastName});	 
		  var oLabel = new sap.ui.commons.Label("ID_LBL_LAST", {text: 'LastName',labelFor: oTF});	 
		  oLayout.createRow(oLabel, oTF);
		    
		  var oTF = new sap.ui.commons.TextField("ID_TXT_FIRST", {tooltip: 'FirstName', editable: true, width: '200px', value: FirstName});	 
		  var oLabel = new sap.ui.commons.Label("ID_LBL_FIRST", {text: 'FirstName',labelFor: oTF});	 
		  oLayout.createRow(oLabel, oTF);
		    
		  var oTF = new sap.ui.commons.TextField("ID_TXT_EMAIL", {tooltip: 'eMail', editable: true, width: '200px', value: eMail});	 
		  var oLabel = new sap.ui.commons.Label("ID_LBL_EMAIL", {text: 'eMail',labelFor: oTF});	 
		  oLayout.createRow(oLabel, oTF);	 
		  
		  return oLayout;
	},
	
	onContactCreate:function(){				       

	  var oDialog = new sap.ui.commons.Dialog("ID_CREATION", {modal: true, closed: function(oControlEvent){sap.ui.getCore().getElementById("ID_CREATION").destroy();}});	  
	  oDialog.addContent(this.rowPopupLayoutPrepare("","",""));	 
	  
	  oDialog.addButton(new sap.ui.commons.Button({text: "OK", press: function()
		  { var lastname  = sap.ui.getCore().getElementById('ID_TXT_LAST').getValue(); 
		    var firstname = sap.ui.getCore().getElementById('ID_TXT_FIRST').getValue();
		    var email     = sap.ui.getCore().getElementById('ID_TXT_EMAIL').getValue();
		    var oEntry = {AddressNumber:"00000000000",LastName:lastname,FirstName:firstname,eMail:email};
		    var oModel = sap.ui.getCore().getModel();
		    oModel.refreshSecurityToken(null, null, false);
			oModel.read("/ZNWGWDEMOCollection", null, null, true, function(oData, oResponse){ oModel.oHeaders["x-csrf-token"] = oResponse.headers['x-csrf-token']; },function(){alert("xcsrf Read failed");});		    
		    oModel.create("/ZNWGWDEMOCollection", oEntry, null, function(){alert("Create successful");},function(){alert("Create failed");});
		    sap.ui.getCore().getElementById('ID_CREATION').destroy();
           }}));	 	 
	  oDialog.setTitle("New Contact");	  
	  oDialog.open();  
	    
	  },	  
});
