	/*********************************
	Copyright Mary Sheahen of Eramis Technologies
	**********************************/
	/*********************
	Global Variables
	********************/
	var stackarray = [[]];
	var stackcount = 0;
	var currentcolor = 0;
	var stack = stackarray[stackcount];
	var currentstack = 0;
	var startx = 0;
	var starty = 0;
	var currel;
	var maxpath;
	var colorfind = ['blue', 'green', 'yellow', 'red', 'orange', 'cyan', 'magenta', 'gray'];
	var operand;
	var answernum;
	var directionpix;
	var tempstack = [[]];
	var tempimgs = [[]];
	var tempsignal = [];
	var tempnum = [];
	
	/*************************************
	function called upon loading to add event listeners for touch
	*********************************************/
	function startup() 
	{
		/*or(var i in localStorage)
		{
			alert(localStorage[i]);
		}*/
		if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText)=='complete')
		{
			document.getElementById('state').src='img/completesymbol.png';
			document.getElementById('next').style.display='inline';
		}
		else if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText)=='perfect')
		{
			document.getElementById('state').src='img/perfectsymbol.png';
			document.getElementById('next').style.display='inline';
		}
		document.getElementById('state').style.display='inline';
		
		document.addEventListener("touchstart", handleStart, false);
		document.addEventListener("touchmove", handleMove, false);
		document.addEventListener("touchend", handleEnd, false);
		
		
		//get specifications for equation from the HTML file
		/*maxpath*/
		var y = document.getElementById('flows').innerText;
		maxpath = y.charAt(y.length-1);

		/*operand and answernum*/
		var x = document.getElementsByClassName('app');
		operand = x[0].id.charAt(x[0].id.length-1);
		answernum = parseInt(x[0].id);
		
		/*block sizes and pixel length for touchmove*/	
		var blocklist = document.getElementsByClassName('block');
		var blocksize = 100 / maxpath;
		for(var i = 0; i < blocklist.length; i++)
		{
			blocklist[i].style.width = (blocksize-.5).toString() + '%';
			blocklist[i].style.height = blocksize.toString() + '%';
		}
		//window.localStorage.setItem("SuperBaby 1", null);
		//window.localStorage.setItem("SuperBaby 2", null);
		//window.localStorage.setItem("SuperBaby 3", null);
		

	
		directionpix = 300/maxpath
		
	}
	
	/***********************
	swip back and forth
	*******************/
	
	
	//document.swipeleft(function(){
	/****************
	handles touchstart events
	***************/
	function handleStart(e){
		e.preventDefault();
		 //alert(e.changedTouches[0].target);
		 //alert(this.id);
	
		//alert(operand);
		//alert(answernum);
		
		
		startx = e.touches[0].clientX;
		starty = e.touches[0].clientY;
		//alert(e.changedTouches[0].target);
		
		//if we click on the number
		if(e.changedTouches[0].target=='[object HTMLSpanElement]')
		currel = e.changedTouches[0].target.parentNode;
		else if(e.changedTouches[0].target=='[object HTMLElement]'){
			if(e.changedTouches[0].target.id == 'flows' || e.changedTouches[0].target.id =='currentstack')
				return;
			currel = e.changedTouches[0].target.parentNode;
		}
		//click on block div
		else if(e.changedTouches[0].target=='[object HTMLDivElement]')
		currel= e.changedTouches[0].target;
		
		//click on refresh
		else if(e.changedTouches[0].target.id=='refresh')
		window.location.reload();
	
		else
			return;
		
		
		if(currel.innerText)
		{
			numbertile(currel);
		}
		else
			highlight(currel);
		
	}
	
	/********************
	handles touchmove events
	*****************/
	function handleMove(e){
		e.preventDefault();
		var temp;
		
		update();
					
		if(e.changedTouches[0].clientX - startx > directionpix){
			temp = document.getElementById((stack[stack.length-1]+1).toString());
			startx = e.changedTouches[0].clientX;
			//starty = e.changedTouches[0].clientY;
		}
		
		else if(e.changedTouches[0].clientY-starty > directionpix){
			temp = document.getElementById((stack[stack.length-1]+10).toString());
			//startx = e.changedTouches[0].clientX;
			starty = e.changedTouches[0].clientY;
		}
		
		else if(e.changedTouches[0].clientX-startx < (-1)*directionpix){
			temp = document.getElementById((stack[stack.length-1]-1).toString());
			startx = e.changedTouches[0].clientX;
			//starty = e.changedTouches[0].clientY;
		}
		
		else if(e.changedTouches[0].clientY-starty < (-1)*directionpix){
			temp = document.getElementById((stack[stack.length-1]-10).toString());
			//startx = e.changedTouches[0].clientX;
			starty = e.changedTouches[0].clientY;
		}
		else
			return;
		//alert(e.touches[0].clientX);
			//temp = document.getElementById((stack[stack.length-1]+1).toString())
			
			if(temp.innerText)
				numbertile(temp);
			else{
				highlight(temp);
				justkidding(temp);
				
			}
			
	}
	
	/*****************
	the user has lifted their finger
	***************/
	
	function handleEnd(e){

	tempnum = [];
	tempsignal = [];
	tempstack = [[]];
	tempimgs = [[]];
	document.getElementById('loadedimg').innerHTML = "";
	
	if(e.changedTouches[0].target.id=='prev')
		setTimeout(function(){window.location = e.changedTouches[0].target.parentNode}, 300);
	
	else if(e.changedTouches[0].target.id=='next')
		setTimeout(function(){window.location = e.changedTouches[0].target.parentNode}, 300);
	}

	 function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

	/*******************************
	handles alert buttons
	*****************************/
	function onConfirm(buttonIndex){
			
			if (buttonIndex==2)					
				setTimeout(function(){window.location.reload()}, 500);  
			else
				setTimeout(function(){window.location = document.getElementById('next').parentNode}, 500)
			
		}
	/****************************
	executes code upon touching a numbertile
	**************************/
	function numbertile(image) {
		var curr = parseInt(image.id);
			var colorword;
			
			document.getElementById('eq1').innerText=document.getElementById(curr.toString()).innerText + "  " + operand + " " + answernum + " =  __";
			document.getElementById('eq2').innerText="__  " + operand + " " + answernum +" = " + document.getElementById(curr.toString()).innerText;
			//change image source
			image.style.backgroundImage="url(./img/select.png)";
			image.style.color=colorfind[currentcolor];
			image.style.textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
			//alert(curr);
			//check if this stack is already complete
				
				for(var i = 0; i < stackarray.length;  i++)
				{
					for(var j = 0; j < stackarray[i].length; j++)
					{
						if(curr == stackarray[i][0] || curr == stackarray[i][stackarray[i].length-1])
						{
							if(stackarray[i].length == 1)
							{
								stackarray[i] .pop();
							}
							else{
							//what color was dat stack?
							var whatcolor=document.getElementById(stackarray[i][1].toString()).style.backgroundImage;
							if(whatcolor.match('blue'))
								currentcolor=0;
							else if(whatcolor.match('green'))
								currentcolor=1;
							else if(whatcolor.match('yellow'))
								currentcolor=2;
							else if(whatcolor.match('red'))
								currentcolor=3;
							else if(whatcolor.match('orange'))
							currentcolor=4;
							
							//change the stack images to blank
							for(var k = 0; k < stackarray[i].length; k++)
								document.getElementById(stackarray[i][k].toString()).style.backgroundImage = "url(./img/blankblock.png)";
								
	
							
								//decrement stack count && change array && change current 
							
								stackcount--;
								
								stackarray[i] = [];
								update();
								//change stack only if the current one is empty
								if(stack.length==0)
								{
									stack = stackarray[i];
									image.style.color=colorfind[currentcolor];
									image.style.backgroundImage="url(./img/select.png)";
								}
							}
						}
					}
				}
			
			//we've already selected a number tile
			if(stack.length > 0){
			   // alert("hello")
				var previous = stack.pop();
				//alert(previous);
				if(previous==curr){
				
			//	alert("hello");
				return;
				}
				//we changed our mind on which numbertile to start with
				//alert(document.getElementById(previous.toString()).innerText);
				if(document.getElementById(previous.toString()).innerText)
				{
					var element = document.getElementById(previous.toString());
					element.style.backgroundImage="url(./img/blankblock.png)";
					element.style.color="black";
					stack.push(curr);
					
					return;
				}
				
				//alert("helllllllo");
				if(curr-previous != 1 && curr-previous != -1 && curr-previous != 10 && curr-previous != -10){
					stack.push(previous);
					stackarray.push([]);
					var i = 0;
					while(stackarray[i].length > 0)
					i++;
					stack = stackarray[i];
					stack.push(curr);
					return;
					//alert("!!");
				}
				
				//we went back.
				if(curr==stack[0])
				{
				stackcount++;
				document.getElementById(previous.toString()).style.backgroundImage="url(./img/blankblock.png)";
				return;
				}
				
				//get prevvios
				var prevvious = stack.pop();
				
				//alert("still here");
				//check to see if the squares are equal to the equation 
				var x = parseInt(image.innerText);
				
				if(stack.length > 0)
					var y = parseInt(document.getElementById(stack[0].toString()).innerText);
				else
					var y = parseInt(document.getElementById(prevvious.toString()).innerText);
				
				//figure out what operand to use
				var eq1;
				var eq2;
				
				if(operand == '+')
				{
					eq1 = x + answernum;
					eq2 = y + answernum;
				}
				else if(operand == '-')
				{
					eq1 = x - answernum;
					eq2 = y - answernum;
				}
				else if(operand == '*')
				{
					eq1 = x * answernum;
					eq2 = y * answernum;
				}
				else
				{
					eq1 = x / answernum;
					eq2 = y / answernum;
				}
				
				//a correct pair. move to next stack.
				if (y==eq1 || x==eq2){
		
					//we completed a path. do previous square images
					image.style.color='black';
					image.style.textShadow="none";
					document.getElementById(stack[0].toString()).style.color='black';
					document.getElementById(stack[0].toString()).style.textShadow="none";
					//var snd = new Media("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3", onSuccess, onError);
					//var snd = new Media("/assets/www/successful.mp3", onSuccess, onError);
        		//	snd.play();
				//	alert(snd);
					
					if(curr==(previous-10)){
						image.style.backgroundImage = "url(./img/completedwn" + colorfind[currentcolor] + ".png)";
						goup(previous, prevvious);}
					else if(curr==(previous+10)){
						image.style.backgroundImage = "url(./img/completeup" + colorfind[currentcolor] + ".png)";
						godown(previous, prevvious);}
					else if(curr==(previous-1)){
						image.style.backgroundImage = "url(./img/completeright" + colorfind[currentcolor] + ".png)";
						goleft(previous, prevvious);}
					else if(curr==(previous+1)){
						image.style.backgroundImage = "url(./img/completeleft" + colorfind[currentcolor] + ".png)";
						goright(previous, prevvious);}
				
					stack.push(prevvious, previous, curr);
					
								if(y==eq1)
						document.getElementById('eq').innerText= x  + "  " + operand + "  " + answernum + " = " + y;
					else
						document.getElementById('eq').innerText=y + " " + operand + " " + answernum + " = " + x;
						
						document.getElementById('eq1').style.display='none';
						document.getElementById('eq2').style.display='none';
						document.getElementById('eq').style.display='inline';
						
						setTimeout(function(){
							document.getElementById('eq').style.color='white';
							document.getElementById('eq').innerText="__ "  + operand + "  " + answernum + " = __";
							}, 2000);
					//for(var i = 0; i < stack.length; i++)
					//{
							//document.getElementById('bl' + stack[i].toString()).style.backgroundColor="#00FF00";
					//}
						for(var i = 0; i < stack.length; i++)
						{
							var element = document.getElementById(stack[i].toString());	
							if(element.style.backgroundImage.match('vert'))
								element.style.backgroundImage = "url(./img/completestraight_vert" + colorfind[currentcolor] + ".png)";
							else if(element.style.backgroundImage.match('hor'))
								element.style.backgroundImage = "url(./img/completestraight_hor" + colorfind[currentcolor] + ".png)";
							else if(element.style.backgroundImage.match('topright'))
								element.style.backgroundImage = "url(./img/completetopright" + colorfind[currentcolor] + ".png)";
							else if(element.style.backgroundImage.match('topleft'))
								element.style.backgroundImage = "url(./img/completetopleft" + colorfind[currentcolor] + ".png)";
							else if(element.style.backgroundImage.match('bottomright'))
								element.style.backgroundImage = "url(./img/completebottomright" + colorfind[currentcolor] + ".png)";
							else if(element.style.backgroundImage.match("bottomleft"))
								element.style.backgroundImage = "url(./img/completebottomleft" + colorfind[currentcolor] + ".png)";
							else if(element.innerText){
									
								if(element.style.backgroundImage.match("dwn"))
									element.style.backgroundImage = "url(./img/completedwn" + colorfind[currentcolor] + ".png)";
								else if(element.style.backgroundImage.match("right"))
									element.style.backgroundImage= "url(./img/completeright" + colorfind[currentcolor] + ".png)";
								else if(element.style.backgroundImage.match("left"))
									element.style.backgroundImage = "url(./img/completeleft" + colorfind[currentcolor] + ".png)";
								else if(element.style.backgroundImage.match("up"))
									element.style.backgroundImage = "url(./img/completeup" + colorfind[currentcolor] + ".png)";
							}
							
						}
						
						//alert(stack);
						
					stackarray.push([]);
					stackcount++;
					currentcolor = stackcount;
					
					document.getElementById('flows').innerText="paths: " + stackcount + "/" + maxpath;
					currentstack++;
					update();
					
					
					if(stackcount == maxpath)
					{
						//unlock next level
						var aler = document.getElementsByTagName('h1')[0].innerText.split(" ");
						if(window.localStorage.getItem(aler[0] + " " + (parseInt(aler[aler.length-1]) + 1)) == null)
							window.localStorage.setItem(aler[0] + " " + (parseInt(aler[aler.length-1]) + 1), 'unlocked');
						
						
						if((stackarray.length-1)==maxpath)
						{
							window.localStorage.setItem(document.getElementsByTagName('h1')[0].innerText, 'perfect');
							setTimeout(function(){navigator.notification.confirm("Perfect!", onConfirm, 'Level Perfect', 'Next Level')}, 500);
							//setTimeout(function(){window.location = document.getElementById('next').parentNode}, 500);
						}
						else
							{
							if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText) != 'perfect')
								window.localStorage.setItem(document.getElementsByTagName('h1')[0].innerText, 'complete');
								
							setTimeout(function(){navigator.notification.confirm('complete! go to next level', onConfirm, 'Level Complete', [ 'Next Level', 'Play Again'])}, 500);
							
							}
						//document.getElementById('backgroundimg').style.backgroundImage="url(./img('/image.png)')";
						document.getElementById('backgroundimg').style.backgroundColor="transparent";
						//update();
						//alert("You have completed Level 1 with " + (stackcount) + " pathways!!");
						return;
					
					}
					
					else{
						while(stackarray[currentstack].length > 0)
							currentstack++;
						
						stack = stackarray[currentstack];
						//alert("Correct!!");
					}
				
				//setTimeout(function(){navigator.notification.beep(1)}, 200);
				//navigator.notification.beep(1);
				}
				
				//that dont make sense, reverse everything and erase the stack elements.
				else
				{
					document.getElementById(curr.toString()).style.color="black";
					document.getElementById(curr.toString()).style.textShadow="-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white";
					if(curr-previous==1)
						startx = startx - directionpix;
					else if(curr - previous == -1)
						startx = startx + directionpix;
					else if(curr - previous ==10)
						starty = starty - directionpix;
					else if(curr - previous == -10)
						starty = starty + directionpix;
					//var prevvious=stack.pop();
					stack.push(prevvious, previous);
					image.style.backgroundImage = "url(./img/blankblock.png)";
					
				}
						
			}
			
			//no previous squares, start new path
			else if(stack.length==0){
			
				
				document.getElementById('eq').innerText="__" + operand + " " + answernum + "  = __";
				//document.getElementById('eq1').style.color=colorfind[currentcolor];
				//document.getElementById('eq2').style.color=colorfind[currentcolor];
				//document.getElementById('eq').style.color=colorfind[currentcolor];
				//document.getElementById('eq1').innerText=document.getElementById(curr.toString()).innerText + "  " + operand + " =  __";
				//document.getElementById('eq2').innerText="__  " + operand + " = " + document.getElementById(curr.toString()).innerText;
				document.getElementById('eq').style.display='none';
				document.getElementById('eq1').style.display='inline';
				document.getElementById('eq2').style.display='inline';
				stack.push(curr);
			}
				
		
	}	
	
	/******************************
	check if we are connecting two paths
	********************************/
	/*
	function swordcross(current, prev, prevv)
	{
		for(var i = 0; i < stackarray.length; i++)
		{
			for(var j = 0; j < stackarray[i].length; j++)
			{
				if(current == stackarray[i][j])
				{
					//alert("stop crossing swords!");
					
					//we are connecting two paths
					if(parseInt(document.getElementById(stackarray[i][0].toString()).innerText) + 1 == parseInt(document.getElementById(stack[0].toString()).innerText) || parseInt(document.getElementById(stackarray[i][0].toString()).innerText) - 1 == parseInt(document.getElementById(stack[0].toString()).innerText))
					{
						
						var tempnum = stack.shift();
						if(prevv)
							stack.push(prevv);
						if(prev)
							stack.push(prev);
						
						
						stack.reverse();
						var temparray = stackarray[i].concat(stack);
						stackarray[i] = temparray;
						stack = [];
						stack = stackarray[i];
						numbertile(document.getElementById(tempnum.toString()));
						return true;
					}
					
					stackarray[i].pop();
					  
					 return;
				
			}
		}
		return;
	}
	*/
	/*************************
	update path
	***************************/
	function updatepath(i, k, keyword){
		var element = document.getElementById(stackarray[i][k].toString());
		var colorword = '';

		if(!element.innerText){
			if(stackarray[i][k]-stackarray[i][k-1]==10)
				element.style.backgroundImage="url(./img/mousovertop.png)";
			else if(stackarray[i][k]-stackarray[i][k-1]==(-1)*10)
				element.style.backgroundImage="url(./img/mousoverbottom.png)";
			else if(stackarray[i][k]-stackarray[i][k-1]==1)
				element.style.backgroundImage="url(./img/mousoverleft.png)";
			else
				element.style.backgroundImage="url(./img/mousoverright.png)";
				
		}
		k--;
		for(k; k>0;k--){
		element = document.getElementById(stackarray[i][k].toString());
			if(element.style.backgroundImage.match('vert'))
				element.style.backgroundImage="url(./img/straight_vert.png)";
			else if(element.style.backgroundImage.match('hor'))
				element.style.backgroundImage="url(./img/straight_hor.png)";
			else if(element.style.backgroundImage.match('topleft'))
				element.style.backgroundImage="url(./img/cornerlayertopleft.png)";
			else if(element.style.backgroundImage.match('topright'))
				element.style.backgroundImage="url(./img/cornerlayertopright.png)";
			else if(element.style.backgroundImage.match('bottomright'))
				element.style.backgroundImage="url(./img/cornerlayerbottomright.png)";
			else if(element.style.backgroundImage.match('bottomleft'))
				element.style.backgroundImage="url(./img/cornerlayerbottomleft.png)";
		}
		element = document.getElementById(stackarray[i][0].toString());
			if(element.style.backgroundImage.match('dwn'))
				element.style.backgroundImage="url(./img/" + keyword + "dwn" + colorword + ".png)";
			else if(element.style.backgroundImage.match('up'))
				element.style.backgroundImage="url(./img/" + keyword + "up" + colorword + ".png)";
			else if(element.style.backgroundImage.match('right'))
				element.style.backgroundImage="url(./img/" + keyword + "right" + colorword + ".png)";
			else
				element.style.backgroundImage="url(./img/" + keyword + "left" + colorword + ".png)";
		
	}
	/***************************
	find if it's partof a current stackpath and change the current stack.
	********************/
	function brokenpath(current)
	{
		document.getElementById('eq').innerText="__" + operand + " " + answernum + "  = __";
		for(var i = 0; i < stackarray.length; i++){
			for(var j = 0; j<stackarray[i].length; j++){
				if(current == stackarray[i][j]){
					//alert(stackarray[i].length);
								
					//are we breaking a complete path?
					if(document.getElementById(stackarray[i][stackarray[i].length-1].toString()).innerText)
					{
						var whatcolor=document.getElementById(stackarray[i][0].toString()).style.backgroundImage;
						if(whatcolor.match('blue'))
							currentcolor=0;
						else if(whatcolor.match('green'))
							currentcolor=1;
						else if(whatcolor.match('yellow'))
							currentcolor=2;
						else if(whatcolor.match('red'))
							currentcolor=3;
						else if(whatcolor.match('orange'))
							currentcolor=4;
					
						stackcount--;
						update();
						
						//add tempnum to the array
						tempnum.push(i);
						tempsignal.push(stack[stack.length-1]);
						//tempstack
						
						if(tempnum.length > 1)
						{
							tempstack.push([]);
							tempimgs.push([]);
						}
						//alert(tempstack);
						for(var k = 0; k < stackarray[tempnum[(tempnum.length-1)]].length; k++)
						{
							var im = document.getElementById(stackarray[tempnum[tempnum.length-1]][k].toString()).style.backgroundImage;
							//alert("image url is" + im);
							//lert("iimages are " + tempimgs[tempnum.length-1]);
							tempimgs[tempnum.length-1].push(im);
							
							//alert(tempstack[tempstack.length-1]);
							tempstack[tempnum.length-1].push(stackarray[i][k]);
							//alert(tempstack[tempnum.length-1[k]);
							/*is there an append to html function?*/
							var temphtml = document.getElementById('loadedimg').innerHTML;
							
							//tempimgs[k];
							//tempimgs[k].shift(5);
							var imgstr = tempimgs[tempimgs.length-1][k].substring(62, tempimgs[tempimgs.length-1][k].length-1);
							//alert(temphtml);
							
							document.getElementById('loadedimg').innerHTML=temphtml + "<img src='" + imgstr + "'style='display:none'>";
						}
						//alert(tempstack);
						//alert(tempstack.length);
					}
					//save a copy of the sgtack in case we need to go back
					
		
					
					//save a copy of the images so we can easily replace them.
				
					
					//perform pop operations for rest of stack.
					for(var k = stackarray[i].length-1; k >= j; k--)
					{
						document.getElementById(stackarray[i][k].toString()).style.backgroundImage="url(./img/blankblock.png)";
						//alert(stackarray[i]);
						stackarray[i].pop();
					}
					updatepath(i, k, 'select');
					
					if(stack.length==0)
					{
						stack = stackarray[i];
					
						document.getElementById(stack[0].toString()).style.color=colorfind[currentcolor];
						return i;
					}
				}
			}
		}
		return currentstack;
	}
	
	/************************
	updates the paths information
	***********************/
	
	function update()
		{
		document.getElementById('flows').innerText="paths: " + stackcount + "/" + maxpath;
		document.getElementById('currentstack').innerText="moves: " + (stackarray.length-1);
	}
	
	/**********************
	check to see if we are going back from breaking a path.  if so. replace the path
	**********************/
	
	function justkidding(element)
	{
		
		var curr = parseInt(element.id);
		//alert(tempstack[tempstack.length-1].length);
		if(curr == tempsignal[tempsignal.length-1])
		{
			
			//alert(stackarray[tempnum].length);
			tempsignal.pop();
			for(var k = 0; k < tempstack[tempstack.length-1].length; k++)
			{
				stackarray[tempnum[tempnum.length-1]][k] = tempstack[tempstack.length-1][k];
				//alert(tempimgs[k]);
				document.getElementById(stackarray[tempnum[tempnum.length-1]][k].toString()).style.backgroundImage=tempimgs[tempimgs.length-1][k];
				//alert(document.getElementById(stackarray[tempnum][k].toString()).style.backgroundImage)
				
			}
			//updatepath(stacknum,  stackarray[stacknum].length-1, currentcolor);
			var b = tempstack[tempstack.length-1].length;
			//alert(b);
			
			tempstack.pop([]);
			tempimgs.pop([])
			tempnum.pop()
			
			//check to see if the stack is zero, if so, make it a stack of 1 with empty
			//alert(tempstack.length);
			if(tempstack.length == 0)
			{
				tempstack = [[]];
				tempimgs = [[]];
				tempnum = [];
				tempsignal = [];
				//document.getElementById('loadedimg').innerHTML = "";
			}
				
			stackcount++;
			currentcolor = stackcount;
			
		}
		
	}
			
		
	/**********************
	executes when a user moves accross non-number tiles
	*********************/
	function highlight(image)
	{
		
		var curr = parseInt(image.id);
	
		//are we touching a space that is already in a stack??
		currentstack = brokenpath(curr);
	
		//if the stack is still empty, dont let images change
		if(stack.length == 0)
			return;
		
		//get previous value
		var prev = stack.pop();
		var first;
		
		//hitting the same spot
		if(curr==prev)
		{
			stack.push(prev);
			return;
		}
		
		//get the one before that.
		if(stack.length!=0)
			var prevv = stack.pop();
			
		//go back, we've changed our mind.
		if(curr==prevv)
		{
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/blankblock.png)";
			prev = stack.pop();
			prevv = null;
		}

			
		//swordcross(curr, prev, prevv);
	
		/*************************
		we know what stack to use, now we can start our regular image changing operations
		*************************/
		prevel = document.getElementById(prev.toString());
		//alert(prevel);
		//come from bottom	
		if(curr==(prev-10)){
			image.style.backgroundImage="url(./img/mousoverbottom.png)";
			if(prevel.innerText)
				prevel.style.backgroundImage="url(./img/selectup.png)";
			if(prevv)
			goup(prev, prevv);
		}
		
		//come from top
		else if(curr==(prev+10)){
			image.style.backgroundImage="url(./img/mousovertop.png)";
			if(prevel.innerText)
				prevel.style.backgroundImage="url(./img/selectdwn.png)";
			if(prevv)
				godown(prev, prevv);
		}
		
		//come from left
		else if(curr==(prev+1)){
			image.style.backgroundImage="url(./img/mousoverleft.png)";
			if(prevel.innerText)
				prevel.style.backgroundImage="url(./img/selectright.png)";
			if(prevv)
				goright(prev, prevv);
		}
		
		//come from right
		else if(curr==(prev-1)){
			image.style.backgroundImage="url(./img/mousoverright.png)";
			if(prevel.innerText)
				prevel.style.backgroundImage="url(./img/selectleft.png)";
			if(prevv)
			goleft(prev, prevv);
		}
		
		/******************
		these next lines will probably never execute
		******************/
		
		else{
			if(prevv)
			stack.push(prevv);
			
			stack.push(prev);
			return;
		}
			
		
		//push back onto the stack.
		if(prevv)
		stack.push(prevv);
		
		stack.push(prev, curr);
		//alert(stack);
      }
	
	
		
	/******************
	change images if we are moving up a square
	*******************/
	function goup(prev, prevv)
	{
			if(prev==(prevv-1))
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayertopright.png)";
			else if(prev==(prevv+1))
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayertopleft.png)";
			else
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/straight_vert.png)";
	}
		
	/*********************
	changes images if we are moving down a square
	********************/
	function godown(prev, prevv)
	{
			if(prev==(prevv-1)){
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayerbottomright.png)";}
			//document.getElementById('03').style.backgroundImage="url(./img/completebottomright.png)";}
			else if(prev==(prevv+1)){
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayerbottomleft.png)";}
			else{
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/straight_vert.png)";}
	}
		
	/***************************
	changes images if we are moving to the right a square
	******************************/	
	function goright(prev, prevv)
	{
			if(prev==(prevv-10)){
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayerbottomright.png)";}
			else if(prev==(prevv+10)){
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayertopright.png)";}
			else{
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/straight_hor.png)";}
	}
		
	/*******************************
	changes images if we are moving to the left a square
	********************************/
	function goleft(prev, prevv){
			if(prev==(prevv-10)){
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayerbottomleft.png)";}
			else if(prev==(prevv+10)){
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/cornerlayertopleft.png)";}
			else{
			document.getElementById(prev.toString()).style.backgroundImage="url(./img/straight_hor.png)";}
	}	