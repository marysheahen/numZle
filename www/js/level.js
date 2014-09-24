	/*********************************
	Copyright Mary Sheahen of Eramis Technologies
	**********************************/
	/*************************************
	function called upon loading to add event listeners for touch
	*********************************************/
	function startup()
	{
		//window.localStorage.clear();
		//if this is a new game we must initialize levels
		if(window.localStorage.length==0)
			window.localStorage.setItem('SuperBaby 1', 'unlocked');
			
		//make sure the levels have the correct background image
		for(var i =1; i < 13; i++)
		{	
			//alert(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText + ' ' + i.toString()))
			if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText + ' ' + i.toString()) == 'perfect')
				document.getElementById(i.toString()).style.backgroundImage='url(img/perfectsymbol.png)';
			else if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText + ' ' + i.toString()) == 'complete')
				{
				document.getElementById(i.toString()).style.backgroundImage='url(img/completesymbol.png)';
				document.getElementById(i.toString()).style.backgroundSize='80% 80%';
				}
			else if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText + ' ' + i.toString()) == 'unlocked')
			{
				document.getElementById(i.toString()).style.backgroundImage='url(img/unlockedsymbol.png)';
				document.getElementById(i.toString()).style.backgroundSize='80% 80%';
			}
			
		}
		document.addEventListener("touchstart", handleStart, false);
		document.addEventListener("touchmove", handleMove, false);
		document.addEventListener("touchend", handleEnd, false);
	}
	
	function handleStart(e)
	{
		e.preventDefault();
		//alert(e.changedTouches[0].target);
		if(e.changedTouches[0].target=='[object HTMLElement]')
//		|| e.changedTouches[0].target=='[object HTMLelement]')
			currel = e.changedTouches[0].target.parentNode;
		else if(e.changedTouches[0].target=='[object HTMLDivElement]')
			currel = e.changedTouches[0].target;
		else
			return;
			
			
		gotopage(currel);
	
	}
	
	function handleMove(e)
	{
		e.preventDefault();
	}
	
	function handleEnd(e)
	{
		e.preventDefault();
	}
	
	function gotopage(e)
	{
		//alert(document.getElementsByTagName('h1')[0].innerText + ' ' + e.id);
		if(window.localStorage.getItem(document.getElementsByTagName('h1')[0].innerText + ' ' + e.id)==null)
			return;
		//go to specified game board html page given the pack name from h1 and the level number from id
			window.location=document.getElementsByTagName('h1')[0].innerText + e.id + '.html';
	}