/**
 * Project: jQuery List-Tree-View
 * Description: Render nested Lists into a smart tree-view
 * Author: Daniel Köntös :: MilkmanMedia - Your WebApp Innovator - www.MilkmanMedia.de
 * License: MIT, GPL
 */

(function($){
  $.ListTreeView = {
    defaults: {
      classOpened: 'opened',
      classClosed: 'closed',
      classParentIcon: 'icon-expand',
      classChildIcon: 'icon-expand',
      iconEl: '<span />',
      listType: 'ol',
      listItem: 'li',
      baseAllwaysOpen: true,
      addIconToAll: true
    }
  };
  $.fn.extend({
    ListTreeView: function(data){
      $(this).each(function(){
        var ltv = $.ListTreeView;
        var ltvO = $(this);
        
        var config = $.extend({}, ltv.defaults, data);
        
        config = $.extend({}, config, {
          baseSelector: '#'+ltvO.attr('id'),
          items: $(config.listType+' '+config.listItem)
        });
        
        console.dir(config);
        
        $(config.baseSelector+' > '+config.listItem).css('padding-left', ((!config.baseAllwaysOpen)?15:0));
         
        config.items.click(function(e){
          var isParent = $(this).find('> '+config.listType).length > 0;

          if(config.baseAllwaysOpen && isParent && (e.target == e.currentTarget && !$(this).parent().is(config.baseSelector))){
            $(this).toggleClass(config.classOpened+' '+config.classClosed);
          }
          else if(e.target == e.currentTarget && isParent){
            $(this).toggleClass(config.classOpened+' '+config.classClosed);
          }
        });

        config.items.each(function(i,o){
          var o = $(o);
          var isBase = o.parent().is(config.baseSelector);
          var isParent = o.find('> '+config.listType).length > 0;
          var iconObj = $(config.iconEl);

          if((config.baseAllwaysOpen && !isBase && isParent) || (!config.baseAllwaysOpen && isParent))
            o.addClass(config.classClosed).prepend(iconObj.addClass(config.classParentIcon)); 
          else if(!isParent && config.addIconToAll)
            o.prepend(iconObj.addClass(config.classChildIcon));
        });

      });
    }
  });
})(jQuery);
