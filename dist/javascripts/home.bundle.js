!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./client/bundles/home/index.js")}({"./client/bundles/home/index.js":
/*!**************************************!*\
  !*** ./client/bundles/home/index.js ***!
  \**************************************/
/*! no static exports found */function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.initializeSearchBox(),this.initializeDocumentsList(),this.initializeHotKeys(),this.initializeCategories(),this.initializeTags()}return i(e,[{key:"initializeHotKeys",value:function(){var e=this;window.addEventListener("keydown",function(t){var n=["Digit1","Digit2","Digit3"];t.altKey&&n.includes(t.code)&&e.columnsPreview(parseInt(n.indexOf(t.code))+1)})}},{key:"columnsPreview",value:function(e){for(var t=1;t<=3;t++)$("body").classList.remove("divide-"+t);$("body").classList.add("divide-"+e)}},{key:"initializeDocumentsList",value:function(){var e=$$("body > div.column.titles > ul > li"),t=this,n=!0,i=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){a.value.onclick=function(){var e=this.getAttribute("data-id");document.querySelector(".article-loading").style.display="block",t.selectDocument(e),t.loadDocument(e)}}}catch(e){i=!0,r=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw r}}}},{key:"initializeCategories",value:function(){var e=this,t=document.querySelectorAll(".categories > li"),n=!0,i=!1,r=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){a.value.onclick=function(){var t=this.getAttribute("data-id");document.querySelector(".articles-loading").style.display="block",e.filterByCategory(t)}}}catch(e){i=!0,r=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw r}}}},{key:"initializeTags",value:function(){var e=this,t=document.querySelectorAll(".hashtags > li"),n=!0,i=!1,r=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){a.value.onclick=function(){var t=this.innerHTML;document.querySelector(".articles-loading").style.display="block",e.filterByTag(t)}}}catch(e){i=!0,r=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw r}}}},{key:"selectDocument",value:function(e){var t=$$("body > div.column.titles > ul > li"),n=!0,i=!1,r=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var l=a.value;l.getAttribute("data-id")===e?l.classList.add("active"):l.classList.remove("active")}}catch(e){i=!0,r=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw r}}}},{key:"initializeSearchBox",value:function(){this.searchBox=$(".search-documents"),this.searchBox.onchange=this.searchBox.onkeyup=this.doSearch.bind(this)}},{key:"doSearch",value:function(){var e=this.searchBox.value.toLowerCase(),t=$$("body > div.column.titles > ul > li"),n=!0,i=!1,r=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){a.value.classList.remove("hidden")}}catch(e){i=!0,r=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw r}}var l=!0,c=!1,d=void 0;try{for(var u,s=t[Symbol.iterator]();!(l=(u=s.next()).done);l=!0){var y=u.value;y.innerText.toLowerCase().includes(e)||y.classList.add("hidden")}}catch(e){c=!0,d=e}finally{try{!l&&s.return&&s.return()}finally{if(c)throw d}}}},{key:"loadDocument",value:function(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);document.querySelector(".article-loading").style.display="none",document.querySelector(".article-title").innerHTML=e.title,document.querySelector(".article-content").innerHTML=e.text}},t.open("GET","/getTextByUniqueUrl/"+e,!0),t.send()}},{key:"filterByCategory",value:function(e){var t=new XMLHttpRequest,n=this;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);document.querySelector(".column.titles > ul").innerHTML="";var t=!0,i=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var l=a.value,c=document.createElement("li"),d=document.createElement("h3"),u=document.createTextNode(l.name);d.appendChild(u);var s=document.createElement("span"),y=document.createElement("time"),m=document.createTextNode(l.modifiedAt);y.appendChild(m);var h=document.createElement("span"),p=document.createTextNode(" | ");h.appendChild(p);var v=document.createElement("span"),f=document.createTextNode(l.author);v.appendChild(f),s.appendChild(y),s.appendChild(h),s.appendChild(v);var x=document.createElement("p"),b=document.createTextNode(l.summary);x.appendChild(b),c.appendChild(d),c.appendChild(s),c.appendChild(x),c.setAttribute("data-id",l.uniqueUrl),document.querySelector(".column.titles > ul").appendChild(c)}}catch(e){i=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(i)throw r}}document.querySelector(".articles-loading").style.display="none",n.initializeDocumentsList()}},t.open("GET","/category/"+e,!0),t.send()}},{key:"filterByTag",value:function(e){var t=new XMLHttpRequest,n=this;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);document.querySelector(".column.titles > ul").innerHTML="";var t=!0,i=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var l=a.value,c=document.createElement("li"),d=document.createElement("h3"),u=document.createTextNode(l.name);d.appendChild(u);var s=document.createElement("span"),y=document.createElement("time"),m=document.createTextNode(l.modifiedAt);y.appendChild(m);var h=document.createElement("span"),p=document.createTextNode(" | ");h.appendChild(p);var v=document.createElement("span"),f=document.createTextNode(l.author);v.appendChild(f),s.appendChild(y),s.appendChild(h),s.appendChild(v);var x=document.createElement("p"),b=document.createTextNode(l.summary);x.appendChild(b),c.appendChild(d),c.appendChild(s),c.appendChild(x),c.setAttribute("data-id",l.uniqueUrl),document.querySelector(".column.titles > ul").appendChild(c)}}catch(e){i=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(i)throw r}}document.querySelector(".articles-loading").style.display="none",n.initializeDocumentsList()}},t.open("GET","/tag/"+e,!0),t.send()}}]),e}())}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2J1bmRsZXMvaG9tZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJ2YWx1ZSIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiQXBwIiwiX2NsYXNzQ2FsbENoZWNrIiwidGhpcyIsImluaXRpYWxpemVTZWFyY2hCb3giLCJpbml0aWFsaXplRG9jdW1lbnRzTGlzdCIsImluaXRpYWxpemVIb3RLZXlzIiwiaW5pdGlhbGl6ZUNhdGVnb3JpZXMiLCJpbml0aWFsaXplVGFncyIsIl90aGlzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJkaWdpdHMiLCJhbHRLZXkiLCJpbmNsdWRlcyIsImNvZGUiLCJjb2x1bW5zUHJldmlldyIsInBhcnNlSW50IiwiaW5kZXhPZiIsInR5cGUiLCIkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiYWxsTGlzdEl0ZW1zIiwiJCQiLCJ0aGF0IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiIsIl9kaWRJdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yRXJyb3IiLCJ1bmRlZmluZWQiLCJfc3RlcCIsIl9pdGVyYXRvciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibmV4dCIsImRvbmUiLCJvbmNsaWNrIiwidW5pcXVlVXJsIiwiZ2V0QXR0cmlidXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3R5bGUiLCJkaXNwbGF5Iiwic2VsZWN0RG9jdW1lbnQiLCJsb2FkRG9jdW1lbnQiLCJlcnIiLCJyZXR1cm4iLCJjYXRlZ29yaWVzIiwicXVlcnlTZWxlY3RvckFsbCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX3N0ZXAyIiwiX2l0ZXJhdG9yMiIsIl9pZCIsImZpbHRlckJ5Q2F0ZWdvcnkiLCJ0YWdzIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMiLCJfZGlkSXRlcmF0b3JFcnJvcjMiLCJfaXRlcmF0b3JFcnJvcjMiLCJfc3RlcDMiLCJfaXRlcmF0b3IzIiwiaW5uZXJIVE1MIiwiZmlsdGVyQnlUYWciLCJpZCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240IiwiX2RpZEl0ZXJhdG9yRXJyb3I0IiwiX2l0ZXJhdG9yRXJyb3I0IiwiX3N0ZXA0IiwiX2l0ZXJhdG9yNCIsIml0ZW0iLCJzZWFyY2hCb3giLCJvbmNoYW5nZSIsIm9ua2V5dXAiLCJkb1NlYXJjaCIsImJpbmQiLCJxdWVyeSIsInRvTG93ZXJDYXNlIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUiLCJfZGlkSXRlcmF0b3JFcnJvcjUiLCJfaXRlcmF0b3JFcnJvcjUiLCJfc3RlcDUiLCJfaXRlcmF0b3I1IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYiLCJfZGlkSXRlcmF0b3JFcnJvcjYiLCJfaXRlcmF0b3JFcnJvcjYiLCJfc3RlcDYiLCJfaXRlcmF0b3I2IiwiaW5uZXJUZXh0IiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXMiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJ0aXRsZSIsInRleHQiLCJvcGVuIiwic2VuZCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243IiwiX2RpZEl0ZXJhdG9yRXJyb3I3IiwiX2l0ZXJhdG9yRXJyb3I3IiwiX3N0ZXA3IiwiX2l0ZXJhdG9yNyIsIm5ld0RvYyIsImNyZWF0ZUVsZW1lbnQiLCJuZXdEb2NUaXRsZSIsIm5ld0RvY1RpdGxlVGV4dCIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJuZXdEb2NEZXRhaWxzIiwibmV3RG9jRGF0ZVRpbWUiLCJuZXdEb2NEYXRlVGltZURhdGEiLCJtb2RpZmllZEF0IiwibmV3RG9jRGV0YWlsU2VwcmF0b3IiLCJuZXdEb2NEU0RhdGEiLCJuZXdEb2NBdXRob3IiLCJuZXdEb2NBdXRob3JEYXRhIiwiYXV0aG9yIiwibmV3RG9jU3VtbWFyeSIsIm5ld0RvY1N1bW1hcnlEYXRhIiwic3VtbWFyeSIsInNldEF0dHJpYnV0ZSIsInRhZ05hbWUiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOCIsIl9kaWRJdGVyYXRvckVycm9yOCIsIl9pdGVyYXRvckVycm9yOCIsIl9zdGVwOCIsIl9pdGVyYXRvcjgiXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLEtBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsSUFDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxZQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUFLQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxFQUFBUyxJQUNBRyxPQUFBQyxlQUFBYixFQUFBUyxHQUNBSyxjQUFBLEVBQ0FDLFlBQUEsRUFDQUMsSUFBQU4sS0FNQVosRUFBQW1CLEVBQUEsU0FBQWpCLEdBQ0FZLE9BQUFDLGVBQUFiLEVBQUEsY0FBaURrQixPQUFBLEtBSWpEcEIsRUFBQXFCLEVBQUEsU0FBQWxCLEdBQ0EsSUFBQVMsRUFBQVQsS0FBQW1CLFdB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QUFBckYsUUFBQXFGLEVBQUFyRixTQUFBLFdBQUFrRixFQUFBLE1BQUFDLEdBNkM1QzFGLFNBQVNDLGNBQWMscUJBQXFCQyxNQUFNQyxRQUFVLE9BQzVEakIsRUFBS3RCLDRCQUdic0YsRUFBTVcsS0FBSyxNQUFPLFFBQVUwQixHQUFTLEdBQ3JDckMsRUFBTVkiLCJmaWxlIjoiLi9qYXZhc2NyaXB0cy9ob21lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2NsaWVudC9idW5kbGVzL2hvbWUvaW5kZXguanNcIik7XG4iLCJjbGFzcyBBcHAge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVTZWFyY2hCb3goKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVEb2N1bWVudHNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplSG90S2V5cygpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhdGVnb3JpZXMoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVUYWdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUhvdEtleXMgKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGlnaXRzID0gWydEaWdpdDEnLCAnRGlnaXQyJywgJ0RpZ2l0MyddO1xyXG4gICAgICAgICAgICBpZiAoZS5hbHRLZXkgJiYgZGlnaXRzLmluY2x1ZGVzKGUuY29kZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uc1ByZXZpZXcocGFyc2VJbnQoZGlnaXRzLmluZGV4T2YoZS5jb2RlKSkgKyAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb2x1bW5zUHJldmlldyAodHlwZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDM7IGkrKykgJCgnYm9keScpLmNsYXNzTGlzdC5yZW1vdmUoJ2RpdmlkZS0nICsgaSk7XHJcbiAgICAgICAgJCgnYm9keScpLmNsYXNzTGlzdC5hZGQoJ2RpdmlkZS0nICsgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZURvY3VtZW50c0xpc3QgKCkge1xyXG4gICAgICAgIGNvbnN0IGFsbExpc3RJdGVtcyA9ICQkKCdib2R5ID4gZGl2LmNvbHVtbi50aXRsZXMgPiB1bCA+IGxpJyk7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhbGxMaXN0SXRlbXMpIHtcclxuICAgICAgICAgICAgaXRlbS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB1bmlxdWVVcmwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUtbG9hZGluZycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWxlY3REb2N1bWVudCh1bmlxdWVVcmwpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWREb2N1bWVudCh1bmlxdWVVcmwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZUNhdGVnb3JpZXMoKXtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yaWVzID4gbGknKVxyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBjYXRlZ29yaWVzKXtcclxuICAgICAgICAgICAgaXRlbS5vbmNsaWNrID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBfaWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGVzLWxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyQnlDYXRlZ29yeShfaWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZVRhZ3MoKXtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgdGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oYXNodGFncyA+IGxpJylcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGFncyl7XHJcbiAgICAgICAgICAgIGl0ZW0ub25jbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGVzLWxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyQnlUYWcobmFtZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3REb2N1bWVudCAoaWQpIHtcclxuICAgICAgICBjb25zdCBhbGxMaXN0SXRlbXMgPSAkJCgnYm9keSA+IGRpdi5jb2x1bW4udGl0bGVzID4gdWwgPiBsaScpO1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYWxsTGlzdEl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplU2VhcmNoQm94ICgpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEJveCA9ICQoJy5zZWFyY2gtZG9jdW1lbnRzJyk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCb3gub25jaGFuZ2UgPSB0aGlzLnNlYXJjaEJveC5vbmtleXVwID0gdGhpcy5kb1NlYXJjaC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvU2VhcmNoICgpIHtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuc2VhcmNoQm94LnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgYWxsTGlzdEl0ZW1zID0gJCQoJ2JvZHkgPiBkaXYuY29sdW1uLnRpdGxlcyA+IHVsID4gbGknKTtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFsbExpc3RJdGVtcykgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFsbExpc3RJdGVtcykge1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0uaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKSBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkRG9jdW1lbnQodW5pcXVlVXJsKSB7XHJcbiAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZS1sb2FkaW5nJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLXRpdGxlJykuaW5uZXJIVE1MID0gcmVzLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUtY29udGVudCcpLmlubmVySFRNTCA9IHJlcy50ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFwiL2dldFRleHRCeVVuaXF1ZVVybC9cIiArIHVuaXF1ZVVybCwgdHJ1ZSk7XHJcbiAgICAgICAgeGh0dHAuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckJ5Q2F0ZWdvcnkoX2lkKXtcclxuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sdW1uLnRpdGxlcyA+IHVsJykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHJlcyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY1RpdGxlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NUaXRsZS5hcHBlbmRDaGlsZChuZXdEb2NUaXRsZVRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jRGF0ZVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aW1lJylcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jRGF0ZVRpbWVEYXRhID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5tb2RpZmllZEF0KVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RhdGVUaW1lLmFwcGVuZENoaWxkKG5ld0RvY0RhdGVUaW1lRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2NEZXRhaWxTZXByYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2NEU0RhdGEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnIHwgJylcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NEZXRhaWxTZXByYXRvci5hcHBlbmRDaGlsZChuZXdEb2NEU0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY0F1dGhvckRhdGEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLmF1dGhvcilcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NBdXRob3IuYXBwZW5kQ2hpbGQobmV3RG9jQXV0aG9yRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RldGFpbHMuYXBwZW5kQ2hpbGQobmV3RG9jRGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RldGFpbHMuYXBwZW5kQ2hpbGQobmV3RG9jRGV0YWlsU2VwcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RldGFpbHMuYXBwZW5kQ2hpbGQobmV3RG9jQXV0aG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY1N1bW1hcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY1N1bW1hcnlEYXRhID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5zdW1tYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NTdW1tYXJ5LmFwcGVuZENoaWxkKG5ld0RvY1N1bW1hcnlEYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RG9jLmFwcGVuZENoaWxkKG5ld0RvY1RpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvYy5hcHBlbmRDaGlsZChuZXdEb2NEZXRhaWxzKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvYy5hcHBlbmRDaGlsZChuZXdEb2NTdW1tYXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpdGVtLnVuaXF1ZVVybClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbHVtbi50aXRsZXMgPiB1bCcpLmFwcGVuZENoaWxkKG5ld0RvYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGVzLWxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaW5pdGlhbGl6ZURvY3VtZW50c0xpc3QoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgXCIvY2F0ZWdvcnkvXCIgKyBfaWQsIHRydWUpO1xyXG4gICAgICAgIHhodHRwLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJCeVRhZyh0YWdOYW1lKXtcclxuXHJcbiAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sdW1uLnRpdGxlcyA+IHVsJykuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHJlcyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY1RpdGxlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NUaXRsZS5hcHBlbmRDaGlsZChuZXdEb2NUaXRsZVRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jRGF0ZVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aW1lJylcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jRGF0ZVRpbWVEYXRhID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5tb2RpZmllZEF0KVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RhdGVUaW1lLmFwcGVuZENoaWxkKG5ld0RvY0RhdGVUaW1lRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2NEZXRhaWxTZXByYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2NEU0RhdGEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnIHwgJylcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NEZXRhaWxTZXByYXRvci5hcHBlbmRDaGlsZChuZXdEb2NEU0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RG9jQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY0F1dGhvckRhdGEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLmF1dGhvcilcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NBdXRob3IuYXBwZW5kQ2hpbGQobmV3RG9jQXV0aG9yRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RldGFpbHMuYXBwZW5kQ2hpbGQobmV3RG9jRGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RldGFpbHMuYXBwZW5kQ2hpbGQobmV3RG9jRGV0YWlsU2VwcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvY0RldGFpbHMuYXBwZW5kQ2hpbGQobmV3RG9jQXV0aG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY1N1bW1hcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RvY1N1bW1hcnlEYXRhID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5zdW1tYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdEb2NTdW1tYXJ5LmFwcGVuZENoaWxkKG5ld0RvY1N1bW1hcnlEYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RG9jLmFwcGVuZENoaWxkKG5ld0RvY1RpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvYy5hcHBlbmRDaGlsZChuZXdEb2NEZXRhaWxzKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvYy5hcHBlbmRDaGlsZChuZXdEb2NTdW1tYXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RvYy5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpdGVtLnVuaXF1ZVVybClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbHVtbi50aXRsZXMgPiB1bCcpLmFwcGVuZENoaWxkKG5ld0RvYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGVzLWxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pbml0aWFsaXplRG9jdW1lbnRzTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIFwiL3RhZy9cIiArIHRhZ05hbWUsIHRydWUpO1xyXG4gICAgICAgIHhodHRwLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAiXSwic291cmNlUm9vdCI6IiJ9