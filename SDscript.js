$(document).ready(function() {
	$('body').append("<div id='dialsdiv' class='context-menu-one box menu-1' style='position:absolute; z-index: 1;'></div>");
	$('body').append("<div id='app' style='position:absolute; z-index: 2;'><ul></ul></div>");
	//$('body').append("<div id='btn' >AAAA</div>");
	//$('body').append("<div id='page' style='position:absolute; z-index: 3;'> </div>");
	$('#page').hide();
	$('#addGroup').hide();
	
	
	var del = 0;
	var toggle_on_sd = 0;

	$.getJSON('favorites.json', function(json) {
		function loadFromJSON() {
			$.each(json.group, function(key) {
				$('#dialsdiv').append("<div><h5 id='h5_" + this.name + "'>" + this.name + "</h5><div class='test'><ul id='" + this.name + "' class='cldials' style=''></ul></div></div>");
				$('#combo').append('<option id="op_' + this.name + '">' + this.name + '</option>');
			});

			$.each(json.tpb, function(key) {
				$('#' + this.group).append("<li id=" + this.name + " class='clli'><a href='" + this.url + "' target='_blank'><IMG src='pics/" + this.image + "'></a></li>");
			});
			$.each(json.app, function(key) {
				$('#app ul').append("<li id=" + this.name + " class='context-menu-one box menu-1 appcl'><a href='" + this.url + "' target='_blank'><IMG src='pics/" + this.image + "'></a></li>");

			});
		}
		loadFromJSON();
		$.each(json.group, function(key) {

			$('#' + this.name).sortable();
			$('#' + this.name).disableSelection();
		});
		/*     $('#dialsdiv').accordion({
      heightStyle : "content"
    }); */
        $('#app ul').sortable();
		$('#dialsdiv').accordion({
			header: "> div > h5",
			heightStyle: "content",
			icons: {
				header: "iconClosed", // custom icon class
				activeHeader: "iconOpen" // custom icon class
			}
			// event: "mouseover"
		});


		$('#dialsdiv').sortable({
			axis: "y",
			handle: "h5",
			stop: function(event, ui) {
				// IE doesn't register the blur when sorting
				// so trigger focusout handlers to remove .ui-state-focus
				ui.item.children("h5").triggerHandler("focusout");

				// Refresh accordion to handle new order
				$(this).accordion("refresh");
			}
		});
		$(".cldials").sortable({
			connectWith: ".cldials"
		}).disableSelection();


		/*     $(function () {
      $.contextMenu({
        selector : '.context-menu-one',
        callback : function (key, options) {
          var m = "clicked: " + key;
          window.console && console.log(m) || alert(m);
        },
        items : {
          "edit" : {
            name : "Edit",
            icon : "edit"
          },
          "cut" : {
            name : "Cut",
            icon : "cut"
          },
          "copy" : {
            name : "Copy",
            icon : "copy"
          },
          "paste" : {
            name : "Paste",
            icon : "paste"
          },
          "delete" : {
            name : "Delete",
            icon : "delete"
          },
          "sep1" : "---------",
          "quit" : {
            name : "Quit",
            icon : "quit"
          }
        }
      });

      $('.context-menu-one').on('click', function (e) {
        console.log('clicked', this);
      })
    }); */
		$("#togglePHhide").hide();
		$("#toggleCThide").hide();
		$("#toggleTestHide").hide();
		$("#menuHide").hide();
		$('.add').click(function(e) {
			var add_group = $("input#new_group").val();
			$('#dialsdiv').append("<h5 id='h5_" + add_group + "'>" + add_group + "</h5><div class='test'><ul id='" + add_group + "' class='cldials' style=''></ul><div>");
			$('#combo').append('<option id="op_' + add_group + '">' + add_group + '</option>');
			$("#addGroup").hide();
			saveToJSON();
			location.reload();
			$('#dialsdiv').accordion("refresh");
		});

		$("#togglePHshow").button().click(function() {
			$.each(json.group, function(key) {
				$('#' + this.name).append("<li class='addSD'>+</li>");
			});
							$('.addSD').bind('contextmenu', function(e) {
					alert('test');
					$('#page').show();
			return false;
		});
			$("#togglePHhide").show();
			$(this).hide();
		});
		$("#togglePHhide").button().click(function() {
		$('.addSD').remove();
			$("#togglePHshow").show();
			$(this).hide();
		});
		$("#toggleCTshow").button().click(function() {
			$('.ui-widget-content').show();
			$("#toggleCThide").show();
			$(this).hide();
		});
		$("#toggleCThide").button().click(function() {
			$('.ui-widget-content').hide();
			$("#toggleCTshow").show();
			$(this).hide();
		});
			$("#toggleTestShow").button().click(function() {
			var wdt = $(window).width() - 500;
				$("#dialsdiv").css("width", wdt);
			$("#toggleTestHide").show();
			$(this).hide();
		});
		$("#toggleTestHide").button().click(function() {
			$("#dialsdiv").css("width", "95%")
			$("#toggleTestShow").show();
			$(this).hide();
		});


		function saveToJSON() {
			var arr_all = [];
			var arr_id = [];
			var arr_img = [];
			var arr_group = [];
			var arr_url = [];
			$('#dialsdiv li').each(function(index, id, html) {
				arr_id.push($(this).attr('id'));
			});
			$('#dialsdiv li').each(function(index, id, html) {
				arr_group.push($(this).closest('ul').attr('id'));
			});
			$('#dialsdiv li a').each(function(index, id, html) {
				arr_url.push($(this).attr('href'));
			});
			$('#dialsdiv img').each(function(index, id, html) {
				arr_img.push($(this).attr('src').substring(5));
			});
			var arr_app_all = [];
			var arr_app_id = [];
			var arr_app_img = [];
			var arr_app_group = [];
			var arr_app_url = [];
			$('#app li').each(function(index, id, html) {
				arr_app_id.push($(this).attr('id'));
			});
			$('#app li').each(function(index, id, html) {
				arr_app_group.push($(this).closest('div').attr('id'));
			});
			$('#app a').each(function(index, id, html) {
				arr_app_url.push($(this).attr('href'));
			});
			$('#app img').each(function(index, id, html) {
				arr_app_img.push($(this).attr('src').substring(5));
			});
			//alert(arr_app_img);
			arr_len = arr_img.length;
			for (i = 0; i < arr_len; i++) {
				arr_all.push('\n{\n"name":"' + arr_id[i] + '",\n"group":"' + arr_group[i] + '",\n"image":"' + arr_img[i] + '",\n"url":"' + arr_url[i] + '"\n}\n');
			}
			arr_app_len = arr_app_img.length;
			for (i = 0; i < arr_app_len; i++) {
				arr_app_all.push('\n{\n"name":"' + arr_app_id[i] + '",\n"group":"' + arr_app_group[i] + '",\n"image":"' + arr_app_img[i] + '",\n"url":"' + arr_app_url[i] + '"\n}\n');
			}
			var arr2 = [];
			$('#dialsdiv h5').each(function(index, id, html) {
				arr2.push('{\n"name":"' + $(this).text() + '"\n}\n');
			});

			var tasktitle = arr_all;
			var group =  arr2 ;	
			var apps =  arr_app_all;
/* 						var tasktitle = '{\n  "tpb": [' + arr_all;
			var group = ']\n,\n"group": [\n' + arr2 + '\n]\n}';	
			var apps = '],\n"app": [\n' + arr_app_all; */
			
			var dataString = '&tasktitle=' + tasktitle + '&apps=' + apps + '&group=' + group;

			$.ajax({
				type: "POST",
				url: "save.php",
				data: dataString,

				success: function() {
					$('.title').html("<div id='message'></div>");
					$('#message').html("Saved!")
						.hide()

					.fadeIn(1500, function() {
						$('#message').append("");
					})
						.fadeOut(1500, function() {
							$('#message').append("");
						});
				}
			});

		}
		$('.save').click(function(e) {
			var new_name = $("input#new_name").val();
			var new_url = $("input#new_url").val();
			var new_image = $("#preview img").attr('src');
			//var new_image = $("input#photoimg").val();
			var new_group = $("select#combo").val();
			$('#' + new_group).append("<li id=" + new_name + " class='clli'><a href='" + new_url + "' target='_blank'><IMG src='" + new_image + "'></a></li>");
			saveToJSON();
			location.reload();
			return false;
		});

		/* $("li").click(function () {
    $(this).children('a').removeAttr('href');
    $(this).remove();
}); */

		if ($('.test:visible')) {
			$('.test:visible li:visible').each(function() {
				x = $(this).position();
				$('.test:visible').append('<div class="testing" style="top:' + x.top + ';left:' + x.left + '">x</div>');
				$('.test:visible').show();
			});
		}

		//$('.clli').css('position':'absolute','top':'0','left':'0','border':'0');	
		/*  $("#test").click(function () {
 	$('.testing').remove();
    $('#dialsdiv li:visible').each(function(){

	x=$(this).position();
  //alert("Top: " + x.top + " Left: " + x.left);
	$('#dialsdiv').append('<div class="testing" style="top:'+x.top+';left:'+x.left+'">x</div>');
	//var offset2 = $("li").offset();
  //$('.testing').css('left',offset2.left);    
  //$('.testing').css('top',offset2.top);

});  
$('.testing').toggle();
});*/
		//$("#menu").click(function() {
		//	$("#dialsdiv").toggle();
		//	$("#page").toggle();
		//});
		var li_id;
		$("#menuShow").click(function(e) {
			var wdt = $(window).width()*0.975 - 500;
			var xpos = wdt*0.025 + 500
			$("#dialsdiv").css("width", wdt);
			$("#dialsdiv").css("left", 500);
			$('#page').show();
			$("#menuHide").show();
			$(this).hide();
		});
		$("#menuHide").click(function(e) {
			var wdt = $(window).width()*0.95;
			var xpos = wdt*0.025
			$("#dialsdiv").css("width", wdt);
			$("#dialsdiv").css("left", xpos);
			$('#page').hide();
			$("#menuShow").show();
			$(this).hide();
		});
		
		
		
		$("#plus").click(function(e) {
			$("#addGroup").show();
		});
		$("#minus").click(function(e) {
			var remove_group = $("select#combo").val();
			$('#op_' + remove_group).remove();
			$('#dialsdiv #' + remove_group).remove();
			$('#h5_' + remove_group).remove();
		});
		$(document).on('change', '#photoimg', function() {
			$("#preview").html('');
			$("#preview").html('<img src="loader.gif" alt="Uploading...."/>');
			$("#imageform").ajaxForm({
				target: '#preview'
			}).submit();
		});


		
		//---------- right click on speeddial item ----------//
		$('li').bind('contextmenu', function(e) {
			$('#rc_li').show();
			var offset = $(this).offset();
			$('#rc_li').css('left', offset.left + 75);
			$('#rc_li').css('top', offset.top + 25);
			li_id = $(this).attr("id");
			//alert(li_id);
			var url = $('a', this).attr('href');
			var image = $('img', this).attr('src').substring(5);
			$('#change_id').attr('value', li_id);
			$('#change_url').attr('value', url);
			$('#change_img').attr('value', image);
			$('#change_id').attr('name', li_id);
			$('#change_url').attr('name', url);
			$('#change_img').attr('name', image);
			$('#rc_li_combo').empty();
			$.each(json.group, function(key) {
				$('#rc_li_combo').append('<option id="op_' + this.name + '">' + this.name + '</option>');
			});
			return false;
		});
		
/* 		$('li').bind("contextmenu", function(e) {
			$('#rc_li').show();

			//Store the item that was clicked 
			$("#rc_li").data('originalElement', this);
			var originalElement = $("#rc_li").data('originalElement');
			alert('delete was clicked by ' + originalElement.id);
			return false;
		}); */
		
		
				$('.addSD').bind('contextmenu', function(e) {
					alert('test');
					$('#page').show();
			return false;
		});
		$('#rc_li').on('click', function(e) {
			e.stopPropagation();
		});
		$(document).on('click', function(e) {
			$('#rc_li').hide();
		});
		$('#changeLi').click(function(e) {
			$('#' + li_id).remove();
			//$('.changeLi').on('click', function(e) {
			var change_name = $("input#change_id").val();
			var change_url = $("input#change_url").val();
			var change_image = $("input#change_img").val();
			//var new_image = $("input#photoimg").val();
			var change_group = $("select#rc_li_combo").val();
			
			$('#' + change_group).append("<li id=" + change_name + " class='clli'><a href='" + change_url + "' target='_blank'><IMG src='pics/" + change_image + "'></a></li>");
			//alert(change_name);
			$("#rc_li").hide();
			saveToJSON();
			location.reload();
			//loadFromJSON();
		});
			$('#removeLi').click(function(e) {
			$('#' + li_id).remove();
			$("#rc_li").hide();
			saveToJSON();
			location.reload();
			//loadFromJSON();
		});
		//......json end.....//
	});
});