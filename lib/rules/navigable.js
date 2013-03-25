var Rule = require('../rule').Rule;

var navigable = {
  frameTitleAttr: new Rule({
    name:    'Frame must have title attr',

    message: 'Please add title attribute to this frame',

    ruleurl: 'http://oaa-accessibility.org/rule/10/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('frame').each(function(index, item){
        if (!dom.$(this).attr('title')){
          reporter.error(that.message, 0, that.name);

          throw dom.$(item).parent().html();
        }
      });

      dom.$('iframe').each(function(index, item){
        if (!dom.$(this).attr('title')){
          reporter.error(that.message, 0, that.name);

          throw dom.$(item).parent().html();
        }
      });
    }
  }),

  frameUniqueTitle: new Rule({
    name:    'Title attributes for frames must be unique',

    message: 'The title attribute must be unique for all the frames',

    ruleurl: 'http://oaa-accessibility.org/rule/11/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      var verifyTitleAttr = function(element, dom, reporter, that) {
        var s = [];

        dom.$(element).each(function(index, item){
          var e = dom.$(this).attr('title');

          if (s.indexOf(e) > -1) {
            s.push(e);
          } else {
            reporter.error(that.message, 0, that.name);

            throw dom.$(item).parent().html();
          }
        });
      };

      verifyTitleAttr('frame', dom, reporter, that);
      verifyTitleAttr('iframe', dom, reporter, that);
    }
  })
};

module.exports = navigable;