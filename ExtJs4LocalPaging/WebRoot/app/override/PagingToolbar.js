Ext.define('LocalPagingDemo.override.PagingToolbar', {
    override: 'Ext.toolbar.Paging',

    doRefresh: function(){
     	var me = this, currentPage = 1;
       	me.store.proxy.refreshRecordCache = true;
        if (me.fireEvent('beforechange', me, currentPage) !== false) {
        	me.store.loadPage(currentPage);
        }
    }

}); 