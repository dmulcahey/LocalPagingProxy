Ext.define('LocalPagingDemo.store.LocalPaging', {
    extend: 'Ext.data.Store',
    requires: [
        'LocalPagingDemo.model.SimpleModel',
        'Ext.ux.data.proxy.LocalPagingProxy'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'LocalPaging',
            model: 'LocalPagingDemo.model.SimpleModel',
            pageSize:5,
            proxy: new Ext.ux.data.proxy.LocalPagingProxy({
            	serverProxy: new Ext.data.proxy.Ajax({
            		model: 'LocalPagingDemo.model.SimpleModel',
            		url: 'data/testData.json',
            		reader:{
            			type:'json',
            			successProperty:'success',
                        root:'data'
            		}
            	})
            }),
            remoteSort: true,
            remoteFilter: true
        }, cfg)]);
    }
});