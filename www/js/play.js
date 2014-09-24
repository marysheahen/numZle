function startup()
    	{
			//window.localStorage.clear();
			//alert(window.localStorage.getItem('Zombie'));
			var namearray = ['SuperBaby', 'Baby', 'Kid', 'Teen', 'GrownUp', 'MiddleAge', 'Old', 'Older', 'Zombie'];
			//alert(namearray);
			
			for(var i = 0; i < namearray.length; i++)
			{
				if(window.localStorage.getItem(namearray[i])=='unlocked')
					document.getElementById(i.toString()).style.display='none';
					
				else if(window.localStorage.getItem(namearray[i])=='complete')
				{
					document.getElementById(i.toString()).style.display='inline';
					document.getElementById(i.toString()).src='img/completesymbol.png';
				}
				else if(window.localStorage.getItem(namearray[i])=='perfect')
				{
					document.getElementById(i.toString()).style.display='inline';
					document.getElementById(i.toString()).src='img/perfectsymbol.png';
				}
			}
		}