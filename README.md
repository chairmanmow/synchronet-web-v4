# synchronet-web-v4-single-page-fork

### Turns synchronet-web-v4 install into a mobile optimized single page app.

######  --- The purpose/reason for existing/intended use case for this fork is to enable the user to have a terminal they can hide and show that doesn't lose its state (i.e. logged in) when switching between pages.  This demo also has an audio stream which also benefits from the single page approach by not having to rebuffer on every navigation change. 
###### --- It has been optimized/tweeked with mobile in mind  including changes to the ftelnet keyboard's reactiveness and screen positioning to enable optimal experience especially in the standard portrait mode, which has been overlooked in the BBS community.

_____
###### This package redundantly contains the entire codebase for echicken's synchronet-web-v4 (https://github.com/echicken/synchronet-web-v4).  As of this writing the code in this package is up to date, none-the-less if you have not installed that yet, YOU SHOULD INSTALL THE WEB INTERFACE FROM THERE, AND THEN INSTALL THIS MODIFICATION.  
_______
# *** Install Instructions ***

#### * These instructions assume you have a synchronet-web-v4 install you wish to modify with code from this package 

##### You will replace or add to your existing install from this package's contents to the same location relative to your install:

######  New files
- /web/root/app.js  *
- /web/root/css/ftelnet-responsive.css
- /web/root/css/loader.css
- /web/root/css/responsive-overides.css

###### Replace/Merge

- /web/root/index.xjs **
- /web/root/pages/home.xjs **
- /web/root/ftelnet/ftelnet.norip.noxfer.min.js (replace) ***
- /web/root/ftelnet/ftelnet.norip.xfer.min.js (replace) ***
- /web/root/ftelnet/keyboard/keyboard-480.min.css (replace)****
- /web/root/ftelnet/keyboard/keyboard-720.min.css (replace)****
_____
 ### Asterisks above (***) explained should you need to dive in
 *app.js contains the jquery code responsible for creating/hacking in the SPA behaviour and logic.
 
  ** index.xjs gets has some code (such as jQuery, other dependencies that can be gotten away with) moved outside of it to home.xjs because index.xjs will get rendered every time on every load.  home.xjs is where the Single Page App gets instantiated from only being loaded once.  To instantiated the Single Page App you must start on the page that renders home.xjs which is the standard root in an synchronet-web-v4 install.
  
  *** ftelnet code gets modified for 2 reasons :
  1.There is a bug when loading in desktop mode where the screen gets rendered illegibly, this code contains a change to make ftelnet think it is in mobile mode. 2. Ftelnet changes its opacity when disconnected, screwing up layering.  This keeps the opacity the same no matter what.
  
  **** These keyboards get modified so their widths size relative to the viewport versus pixels. 
  ______
  ##### known issue(s)
- Functionality is driveb by detecting links in the html that point at internal synchronet pages and rendering them inside another part of the page rather than re-rendering the entire thing.  There are some scenarios where it's not implemented, such as submitting a message from the forum because there are re-directs further down in the code.  I'll see what I can do to snuff these out as I go.
