Ext.define('Ext.ux.data.proxy.LocalPagingProxy', {
    extend: 'Ext.data.proxy.Memory',
    alias: 'proxy.localpagingproxy',
    requires: [
        'Ext.data.Store'
    ],

    constructor: function(config) {
    	var me = this;
        this.callParent(arguments);
        me.recordCache = new Ext.data.Store({
        	proxy: config.serverProxy,
        	model: config.serverProxy.model
        });
        me.refreshRecordCache = true;
    },
    
    create: Ext.emptyFn,
    update: Ext.emptyFn,
    destroy: Ext.emptyFn,
    
    read : function(operation, callback, scope){
    	var me = this;
    	if(me.refreshRecordCache){
    		me.recordCache.load({
    			params: operation.params,
    			callback: function(){
    				me.handleRead(operation, callback, scope);
    			}
    		});
    		me.refreshRecordCache = false;
    	}else{
    		me.handleRead(operation, callback, scope);
    	}
    },
    
    handleRead: function(operation, callback, scope){
    	var me = this, result = {
        	    total: me.recordCache.getTotalCount()
        	},
        	sorters, filters, sorterFn, records;

    	scope = scope || this;
    	// "remote" filtering
    	filters = operation.filters;
    	if (filters.length > 0) {
    		me.recordCache.filter(filters);
    		result.totalRecords = result.total = result.records.length;
    	}else{
    		if(me.recordCache.isFiltered()){
    			me.recordCache.clearFilter();
    		}
    	}
    	// "remote" sorting
    	sorters = operation.sorters;
    	if (sorters.length > 0) {
    		me.recordCache.sort(sorters);
    	}
    
    	// paging (use undefined cause start can also be 0 (thus false))
    	if (operation.start !== undefined && operation.limit !== undefined) {
    		result.records = me.recordCache.getRange(operation.start, operation.start + (operation.limit - 1));   
    	}else{
    		result.records = me.recordCache.getRange();
    	}
    	result.count = result.records.length;

    	Ext.apply(operation, {
    		resultSet: result
    	});
    
    	operation.setCompleted();
    	operation.setSuccessful();

    	Ext.Function.defer(function () {
    		Ext.callback(callback, scope, [operation]);
    	}, 10);
    }
    
});
