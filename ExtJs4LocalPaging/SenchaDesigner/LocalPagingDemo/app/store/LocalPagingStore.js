/*
 * File: app/store/LocalPagingStore.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Designer does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('LocalPagingDemo.store.LocalPagingStore', {
    extend: 'Ext.data.Store',
    requires: [
        'LocalPagingDemo.model.SimpleModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'LocalPagingStore',
            model: 'LocalPagingDemo.model.SimpleModel'
        }, cfg)]);
    }
});