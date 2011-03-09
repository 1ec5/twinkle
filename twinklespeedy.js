// If TwinkleConfig aint exist.
if( typeof( TwinkleConfig ) == 'undefined' ) {
	TwinkleConfig = {};
}

/**
 TwinkleConfig.summaryAd (string)
 If ad should be added or not to summary, default "([[WP:TW|TW]])"
 */
if( typeof( TwinkleConfig.summaryAd ) == 'undefined' ) {
	TwinkleConfig.summaryAd = "([[WP:TW|TW]])";
}

/**
 TwinkleConfig.deletionSummaryAd (string)
 If ad should be added or not to deletion summary, default "([[WP:TW|TW]])"
 */
if( typeof( TwinkleConfig.deletionSummaryAd ) == 'undefined' ) {
	TwinkleConfig.deletionSummaryAd = "([[WP:TW|TW]])";
}

/**
 TwinkleConfig.watchSpeedyPages (array)
 What types of actions that should result in forced addition to watchlist
 */
if( typeof( TwinkleConfig.watchSpeedyPages ) == 'undefined' ) {
	TwinkleConfig.watchSpeedyPages = [ 'g3', 'g5', 'g10', 'g11', 'g12' ];
}

/**
 TwinkleConfig.markSpeedyPagesAsMinor (boolean)
 If, when applying speedy template to page, to mark the edit as minor, default false
 */
if( typeof( TwinkleConfig.markSpeedyPagesAsMinor ) == 'undefined' ) {
	TwinkleConfig.markSpeedyPagesAsMinor = false;
}

/**
 TwinkleConfig.markSpeedyPagesAsPatrolled (boolean)
 If, when applying speedy template to page, to mark the page as patrolled, default true
 */
if( typeof( TwinkleConfig.markSpeedyPagesAsPatrolled ) == 'undefined' ) {
	TwinkleConfig.markSpeedyPagesAsPatrolled = true;
}

/**
 TwinkleConfig.notifyUserOnSpeedyDeletionNomination (array of strings)
 What types of actions that should result that the author of the page should be notified of nomination
 */
if( typeof( TwinkleConfig.notifyUserOnSpeedyDeletionNomination ) == 'undefined' ) {
	TwinkleConfig.notifyUserOnSpeedyDeletionNomination = [ 'db', 'g1', 'g2', 'g3', 'g4', 'g10', 'g11', 'g12', 'a1', 'a2', 'a3', 'a5', 'a7', 'a9', 'a10', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f9', 'f10', 'f11', 'u3', 't2', 't3', 'p2' ];
}

/**
 TwinkleConfig.welcomeUserOnSpeedyDeletionNotification (array of strings)
 On what types of speedy deletion notifications shall the user be welcomed
 with a {{firstarticle}} notice if his talk page has not yet been created.
 */
if( typeof( TwinkleConfig.welcomeUserOnSpeedyDeletionNotification ) == 'undefined' ) {
	TwinkleConfig.welcomeUserOnSpeedyDeletionNotification = TwinkleConfig.notifyUserOnSpeedyDeletionNomination;
}

/**
 TwinkleConfig.openUserTalkPageOnSpeedyDelete (array of strings)
 What types of actions that should result user talk page to be opened when speedily deleting (admin only)
 */
if( typeof( TwinkleConfig.openUserTalkPageOnSpeedyDelete ) == 'undefined' ) {
	TwinkleConfig.openUserTalkPageOnSpeedyDelete = [ 'db', 'g1', 'g2', 'g3', 'g4', 'g5', 'g10', 'g11', 'g12', 'a1', 'a3', 'a7', 'a9', 'a10', 'f3', 'f4', 'f5', 'f6', 'f7', 'f9', 'f11', 'u3', 't2' ];
}

/**
 TwinkleConfig.userTalkPageMode may take arguments:
 'window': open a new window, remember the opened window
 'tab': opens in a new tab, if possible.
 'blank': force open in a new window, even if a such window exist
 */
if( typeof( TwinkleConfig.userTalkPageMode ) == 'undefined' ) {
	TwinkleConfig.userTalkPageMode = 'window';
}

/**
 TwinkleConfig.deleteTalkPageOnDelete (boolean)
 If talk page if exists should also be deleted (CSD G8) when spedying a page (admin only)
 */
if( typeof( TwinkleConfig.deleteTalkPageOnDelete ) == 'undefined' ) {
	TwinkleConfig.deleteTalkPageOnDelete = false;
}

/**
 TwinkleConfig.orphanNormalPagesOnSpeedyDelete (hash)
 Defines if all backlinks to a page should be removed.
 property 'exclude' defined actions not to orphan
 */
if( typeof( TwinkleConfig.orphanBacklinksOnSpeedyDelete ) == 'undefined' ) {
	TwinkleConfig.orphanBacklinksOnSpeedyDelete = { exclude: ['g6'], orphan:true };
}

/**
 TwinkleConfig.speedyWindowWidth (integer)
 Defines the width of the Twinkle SD window in pixels
 */
if( typeof( TwinkleConfig.speedyWindowWidth ) == 'undefined' ) {
	TwinkleConfig.speedyWindowWidth = 800;
}

/**
 TwinkleConfig.speedyWindowHeight (integer)
 Defines the height of the Twinkle SD window in pixels
 */
if( typeof( TwinkleConfig.speedyWindowHeight ) == 'undefined' ) {
	TwinkleConfig.speedyWindowHeight = 500;
}

/**
 TwinkleConfig.deleteSysopDefaultToTag (boolean)
 Make the CSD screen default to "tag" instead of "delete" (admin only)
 */
if( typeof(TwinkleConfig.deleteSysopDefaultToTag) == 'undefined' ) TwinkleConfig.deleteSysopDefaultToTag = false;

function twinklespeedy() {
	// Disable on:
	// * special pages
	// * pages with neither a page nor local file revision
	if( wgNamespaceNumber < 0 ||
	(wgArticleId==0 && (wgNamespaceNumber!=6 || (document.getElementById("mw-imagepage-section-filehistory") && !(document.getElementById("mw-sharedupload")))))
	)  return;
	
	if( userIsInGroup( 'sysop' ) ) {
		twAddPortletLink( "javascript:twinklespeedy.callback()", "CSD", "tw-csd", "Speedy delete according to WP:CSD", "");
	} else if (twinkleConfigExists) {
		twAddPortletLink( "javascript:twinklespeedy.callback()", "CSD", "tw-csd", "Request speedy deletion according to WP:CSD", "");
	}
	else
	{
		twAddPortletLink( 'javascript:alert("Your account is too new to use Twinkle.");', 'CSD', 'tw-csd', 'Request speedy deletion according to WP:CSD', '');
	}
}
window.TwinkleInit = (window.TwinkleInit || []).concat(twinklespeedy); //schedule initializer

// This function is run when the CSD tab/header link is clicked
twinklespeedy.callback = function twinklespeedyCallback() {
	twinklespeedy.initDialog(userIsInGroup( 'sysop' ) ? twinklespeedy.callback.evaluateSysop : twinklespeedy.callback.evaluateUser, true);
}

// Prepares the speedy deletion dialog and displays it
// Parameters: 
//  - callbackfunc: the function to call when the dialog box is submitted
//  - firstTime: is this the first time? (false during a db-multiple run, true otherwise)
//  - content: (optional) a div element in which the form content should be rendered - allows
//    for placing content in an existing dialog box
twinklespeedy.initDialog = function twinklespeedyInitDialog(callbackfunc, firstTime, content) {
	var dialog;
	if (!content)
	{
		dialog = new SimpleWindow( TwinkleConfig.speedyWindowWidth, TwinkleConfig.speedyWindowHeight ); 
		dialog.setTitle( "Choose criteria for speedy deletion" );
	}

	var form = new QuickForm( callbackfunc, 'change' );
	if( firstTime && userIsInGroup( 'sysop' ) ) {
		form.append( {
				type: 'checkbox',
				list: [
					{
						label: 'Tag page only, don\'t delete',
						value: 'tag_only',
						name: 'tag_only',
						tooltip: 'If you just want to tag the page, instead of deleting it now',
						checked : TwinkleConfig.deleteSysopDefaultToTag,
						event: function( event ) {
							event.target.form.notify.disabled = ! event.target.checked;
							event.target.form.notify.checked = event.target.checked;
							event.stopPropagation();
						}
					},
					{
						label: 'unlink links to this page',
						value: 'orphan_backlinks',
						name: 'orphan_backlinks',
						tooltip: 'If you want to orphan the current page. If checked, excludes will still apply',
						checked: TwinkleConfig.orphanBacklinksOnSpeedyDelete.orphan,
						event: function( event ) {
							TwinkleConfig.orphanBacklinksOnSpeedyDelete.orphan = event.target.checked;
							event.stopPropagation();
						}
					}
				]
			} );
	}
	
	// don't show this notification checkbox for db-multiple, as the value is ignored
	// XXX currently not possible to turn off notification when using db-multiple
	if (firstTime) {
		form.append( {
				type: 'checkbox',
				list: [
					{
						label: 'Notify if possible',
						value: 'notify',
						name: 'notify',
						tooltip: 'If a notification is defined in the configuration, then notify if this is true, else no notification',
						checked: !userIsInGroup( 'sysop' ) || TwinkleConfig.deleteSysopDefaultToTag,
						disabled: userIsInGroup( 'sysop' ) && !TwinkleConfig.deleteSysopDefaultToTag,
						event: function( event ) {
							event.stopPropagation();
						}
					}
				]
			}
		);
	}
	else form.append( { type:'header', label: 'Tagging with \{\{db-multiple}}: Criterion ' + (twinklespeedy.dbmultipleCriteria.length + 1) } );

	if (!userIsInGroup( 'sysop' ))
	{
		if (firstTime) {
			form.append( { type: 'radio', name: 'csd',
				list: [
					{
						label: 'Tag with multiple criteria',
						value: 'multiple',
						tooltip: 'Opens a series of further dialogs, allowing you to specify all the criteria you want to tag this page with.'
					}
				]
			} );
		}
		else if (twinklespeedy.dbmultipleCriteria.length > 0)
		{
			form.append( { type: 'radio', name: 'csd',
				list: [
					{
						label: 'No more criteria apply - finish tagging',
						value: 'multiple-finish'
					}
				]
			} );
		}
	}

	if( wgNamespaceNumber ==  Namespace.IMAGE ) {
		form.append( {type:'header', label:'Files' } );
		form.append ( { type: 'radio', name: 'csd', list: twinklespeedy.getFileList(!firstTime) } );
	}

	if( wgNamespaceNumber ==  0 || wgNamespaceNumber == 1 ) {
		form.append( { type:'header', label:'Articles' } );
		form.append( { type: 'radio', name: 'csd', list: twinklespeedy.getArticleList(!firstTime) } );
	}
	
	if( wgNamespaceNumber ==  14 || wgNamespaceNumber == 15 ) {
		form.append( { type:'header', label: 'Categories' } );
		form.append( { type: 'radio', name: 'csd', list: twinklespeedy.categoryList } );
	}
	
	if( wgNamespaceNumber ==  2 || wgNamespaceNumber == 3 ) {
		form.append( { type:'header', label: 'User pages' } );
		form.append( { type: 'radio', name: 'csd', list: twinklespeedy.userList } );
	}
	
	if( wgNamespaceNumber ==  10 || wgNamespaceNumber == 11 ) {
		form.append( { type:'header', label: 'Templates' } );
		form.append( { type: 'radio', name: 'csd', list: twinklespeedy.getTemplateList(!firstTime) } );
	}
	
	if( wgNamespaceNumber ==  100 || wgNamespaceNumber == 101 ) {
		form.append( { type:'header', label: 'Portals' } );
		form.append( { type: 'radio', name: 'csd', list: twinklespeedy.portalList } );
	}

	form.append( { type:'header', label:'General criteria' } );
	form.append( { type: 'radio', name: 'csd', list: twinklespeedy.getGeneralList(!firstTime) });

	form.append( { type:'header', label: 'Redirects' } );
	form.append( { type: 'radio', name: 'csd', list: twinklespeedy.redirectList } );
	
	var result = form.render();
	if (dialog)
	{
		// render new dialog
		dialog.setContent( result );
		dialog.display();
	}
	else
	{
		// place the form content into the existing dialog box
		content.textContent = ''; // clear children
		content.appendChild(result);
	}
}

// this is a function to allow for db-multiple filtering
twinklespeedy.getFileList = function twinklespeedyGetFileList(multiple) {
	var result = [];
	result.push({ 
		label: 'F1: Redundant file',
		value: 'redundantimage',
		tooltip: 'Any file that is a redundant copy, in the same file format and same or lower resolution, of something else on Wikipedia. Likewise, other media that is a redundant copy, in the same format and of the same or lower quality. This does not apply to files duplicated on Wikimedia Commons, because of licence issues; these should be tagged with \{\{subst:ncd|Image:newname.ext\}\} or \{\{subst:ncd\}\} instead' 
	});
	result.push({ 
		label: 'F2: Corrupt or empty file, or file description page for file on Commons',
		value: 'noimage', 
		tooltip: 'Before deleting this type of file, verify that the MediaWiki engine cannot read it by previewing a resized thumbnail of it. This also includes empty (i.e., no content) file description pages for Commons files' 
	});
	result.push({ 
		label: 'F3: Improper license',
		value: 'noncom',
		tooltip: '"Files licensed as "for non-commercial use only", "non-derivative use" or "used with permission" that were uploaded on or after 2005-05-19, except where they have been shown to comply with the limited standards for the use of non-free content. This includes files licensed under a "Non-commercial Creative Commons License". Such files uploaded before 2005-05-19 may also be speedily deleted if they are not used in any articles'
	});
	if (!multiple) {
		result.push({
			label: 'F4: Lack of licensing information', 
			value: 'unksource',
			tooltip: 'Files in category "Files with unknown source", "Files with unknown copyright status", or "Files with no copyright tag" that have been tagged with a template that places them in the category for more than seven days, regardless of when uploaded. Note, users sometimes specify their source in the upload summary, so be sure to check the circumstances of the file'
		});
		result.push({
			label: 'F5: Unused unfree copyrighted files',
			value: 'unfree',
			tooltip: 'Files that are not under a free license or in the public domain that are not used in any article and that have been tagged with a template that places them in a dated subcategory of Category:Orphaned fairuse files for more than seven days. Reasonable exceptions may be made for file uploaded for an upcoming article. Use \{\{subst:orfud\}\} to tag files for forthcoming deletion' 
		});
		result.push({
			label: 'F6: Missing fair-use rationale',
			value: 'norat',
			tooltip: 'Any file without a fair use rationale may be deleted seven days after it is uploaded.  Boilerplate fair use templates do not constitute a fair use rationale.  Files uploaded before 2006-05-04 should not be deleted immediately; instead, the uploader should be notified that a fair-use rationale is needed.  Files uploaded after 2006-05-04 can be tagged with \{\{subst:nrd\}\}, and the uploader notified with \{\{subst:missing rationale|File:image name\}\}. Such files can be found in the dated subcategories of Category:Files with no fair use rationale'
		});
	}
	result.push({ 
		label: 'F7: Invalid fair-use claim',
		value: 'badfairuse', 
		tooltip: 'Any file with a clearly invalid fair-use tag (such as a \{\{logo\}\} tag on a photograph of a mascot) may be deleted at any time. Media that fail any part of the non-free content criteria and were uploaded after 2006-07-13 may be deleted forty-eight hours after notification of the uploader. For media uploaded before 2006-07-13 or tagged with the \{\{Replaceable fair use\}\} template, the uploader will be given seven days to comply with this policy after being notified' 
	});
	if (!multiple) result.push({
		label: 'F8: Files available as identical or higher-resolution copies on Wikimedia Commons',
		value: 'nowcommons',
		tooltip: 'Provided the following conditions are met: 1: The file format of both images is the same. 2: The file\'s license and source status is beyond reasonable doubt, and the license is undoubtedly accepted at Commons. 3: All information on the file description page is present on the Commons file description page. That includes the complete upload history with links to the uploader\'s local user pages. 4: The file is not protected, and the file description page does not contain a request not to move it to Commons. 5: If the file is available on Commons under a different name than locally, all local references to the file must be updated to point to the title used at Commons. 6: For \{\{c-uploaded\}\} files: They may be speedily deleted as soon as they are off the Main Page'
	});
	result.push({
		label: 'F9: Unambiguous copyright infringement',
		value: 'imgcopyvio',
		tooltip: 'The file was copied from a website or other source that does not have a license compatible with Wikipedia, and the uploader neither claims fair use nor makes a credible assertion of permission of free use. Sources that do not have a license compatible with Wikipedia include stock photo libraries such as Getty Images or Corbis. Non-blatant copyright infringements should be discussed at Wikipedia:Files for deletion'
	});
	result.push({
		label: 'F10: Useless media file',
		value: 'badfiletype',
		tooltip: 'Files uploaded that are neither image, sound, nor video files (e.g. .doc, .pdf, or .xls files) which are not used in any article and have no foreseeable encyclopedic use'
	});
	if (!multiple) result.push({
		label: 'F11: No evidence of permission',
		value: 'nopermission',
		tooltip: 'If an uploader has specified a license and has named a third party as the source/copyright holder without providing evidence that this third party has in fact agreed, the item may be deleted seven days after notification of the uploader'
	});
	return result;
}

twinklespeedy.getArticleList = function twinklespeedyGetArticleList(multiple) {
	var result = [];
	result.push({
		label: 'A1: No context. Articles lacking sufficient context to identify the subject of the article.',
		value: 'nocontext',
		tooltip: 'Example: "He is a funny man with a red car. He makes people laugh." This applies only to very short articles. Context is different from content, treated in A3, below.'
	});
	result.push({
		label: 'A2: Foreign language articles that exist on another Wikimedia project',
		value: 'foreign',
		tooltip: 'If the article in question does not exist on another project, the template \{\{notenglish\}\} should be used instead. All articles in a non-English language that do not meet this criteria (and do not meet any other criteria for speedy deletion) should be listed at Pages Needing Translation (PNT) for review and possible translation'
	});
	result.push({
		label: 'A3: No content whatsoever',
		value: 'nocontent',
		tooltip: 'Any article consisting only of links elsewhere (including hyperlinks, category tags and "see also" sections), a rephrasing of the title, and/or attempts to correspond with the person or group named by its title. This does not include disambiguation pages'
	});
	result.push({
		label: 'A5: Transwikied articles',
		value: 'transwiki',
		tooltip: 'Any article that has been discussed at Articles for Deletion (et al), where the outcome was to transwiki, and where the transwikification has been properly performed and the author information recorded. Alternately, any article that consists of only a dictionary definition, where the transwikification has been properly performed and the author information recorded'
	});
	result.push({
		label: 'A7: Unremarkable people, groups, companies and web content',
		value: 'a7',
		tooltip: 'An article about a real person, group of people, band, club, company, or web content that does not assert the importance or significance of its subject. If controversial, or if there has been a previous AfD that resulted in the article being kept, the article should be nominated for AfD instead'
	});
	if (!multiple) {
		result.push({
			label: 'A7: Unremarkable person',
			value: 'person',
			tooltip: 'An article about a real person that does not assert the importance or significance of its subject. If controversial, or if there has been a previous AfD that resulted in the article being kept, the article should be nominated for AfD instead'
		});
		result.push({
			label: 'A7: Unremarkable musician(s) or band',
			value: 'band',
			tooltip: 'Article about a band, singer, musician, or musical ensemble that does not assert the importance or significance of the subject'
		});
		result.push({
			label: 'A7: Unremarkable club',
			value: 'club',
			tooltip: 'Article about a club that does not assert the importance or significance of the subject'
		});
		result.push({
			label: 'A7: Unremarkable company or organization',
			value: 'corp',
			tooltip: 'Article about a company or organization that does not assert the importance or significance of the subject'
		});
		result.push({
			label: 'A7: Unremarkable website or web content',
			value: 'web',
			tooltip: 'Article about a web site, blog, online forum, webcomic, podcast, or similar web content that does not assert the importance or significance of its subject'
		});
	}
	result.push({
		label: 'A9: Unremarkable musical recording where artist\'s article doesn\'t exist',
		value: 'a9',
		tooltip: 'An article about a musical recording which does not indicate why its subject is important or significant, and where the artist\'s article has never existed or has been deleted'
	});
	if (!multiple) result.push({
		label: 'A10: Recently created article that duplicates an existing topic',
		value: 'a10',
		tooltip: 'A recently created article with no relevant page history that does not aim to expand upon, detail or improve information within any existing article(s) on the subject, and where the title is not a plausible redirect. This does not include content forks, split pages or any article that aims at expanding or detailing an existing one.'
	});
	return result;
}

twinklespeedy.categoryList = [
	{ 
		label: 'C1: Empty categories',
		value: 'catempty',
		tooltip: '(no articles or subcategories for at least four days) whose only content has consisted of links to parent categories. This does not apply to categories being discussed on WP:CFD or WP:SFD, or disambiguation categories. If the category isn\'t relatively new, it possibly contained articles earlier, and deeper investigation is needed'
	}
];

twinklespeedy.userList = [
	{
		label: 'U1: User request',
		value: 'userreq',
		tooltip: 'Personal subpages, upon request by their user. In some rare cases there may be administrative need to retain the page. Also, sometimes, main user pages may be deleted as well. See Wikipedia:User page for full instructions and guidelines'
	},
	{
		label: 'U2: Nonexistent user',
		value: 'nouser',
		tooltip: 'User pages of users that do not exist (Check Special:Listusers)'
	},
	{
		label: 'U3: Non-free galleries',
		value: 'gallery',
		tooltip: 'Galleries in the userspace which consist mostly of "fair use" or non-free files. Wikipedia\'s non-free content policy forbids users from displaying non-free files, even ones they have uploaded themselves, in userspace. It is acceptable to have free files, GFDL-files, Creative Commons and similar licenses along with public domain material, but not "fair use" files'
	},
];

twinklespeedy.getTemplateList = function twinklespeedyGetTemplateList(multiple) {
	var result = [];
	result.push({
		label: 'T2: Templates that are blatant misrepresentations of established policy',
		value: 'policy',
		tooltip: 'This includes "speedy deletion" templates for issues that are not speedy deletion criteria and disclaimer templates intended to be used in articles'
	});
	if (!multiple) result.push({
		label: 'T3: Templates that are not employed in any useful fashion',
		value: 't3',
		tooltip: 'Templates that are either substantial duplications of another template or hardcoded instances of another template where the same functionality could be provided by that other template'
	});
	return result;
}

twinklespeedy.portalList = [
	{
		label: 'P2: Underpopulated portal',
		value: 'emptyportal',
		tooltip: 'Any Portal based on a topic for which there is not a non-stub header article, and at least three non-stub articles detailing subject matter that would be appropriate to discuss under the title of that Portal'
	}
];

twinklespeedy.getGeneralList = function twinklespeedyGetGeneralList(multiple) {
	var result = [];
	if (!multiple) result.push({
		label: 'Custom rationale using {'+'{db}} template',
		value: 'reason',
		tooltip: '{'+'{db}} is short for "delete because". One of the other deletion criteria must still apply to the page, and you should (must?) make mention of this in your rationale. This is not a "catch-all" for when you can\'t find the right criterion.'
	});
	result.push({ 
		label: 'G1: Patent nonsense. Pages consisting purely of incoherent text or gibberish with no meaningful content or history.', 
		value: 'nonsense', 
		tooltip: 'This does not include poor writing, partisan screeds, obscene remarks, vandalism, fictional material, material not in English, poorly translated material, implausible theories, or hoaxes'
	});
	result.push({ 
		label: 'G2: Test page',
		value: 'test',
		tooltip: 'e.g., "Can I really create a page here?"' 
	});
	result.push({ 
		label: 'G3: Pure vandalism',
		value: 'vandalism',
		tooltip: 'Plain pure vandalism'
	});
	if (!multiple) {
		result.push({
			label: 'G3: Blatant hoax',
			value: 'hoax',
			tooltip: 'Blatant and obvious hoax, to the point of vandalism'
		});
		result.push({ 
			label: 'G3: Pagemove vandalism', 
			value: 'pagemove',
			tooltip: 'Nonsense redirects that are created from the cleanup of page move vandalism'
		});
	}
	result.push({
		label: 'G4: Recreation of deleted material',
		value: 'repost',
		tooltip: 'A copy, by any title, of a page that was deleted via an XfD process or Deletion review, provided that the copy is substantially identical to the deleted version and that any revisions made clearly do not address the reasons for which the page was deleted. This clause does not apply to content that has been "userfied", to content undeleted as a result of Deletion review, or if the prior deletions were proposed or speedy deletions, although in this last case, the previous speedy criterion, or other speedy deletion criteria, may apply'
	});
	result.push({
		label: 'G5: Banned user', 
		value: 'banned',
		tooltip: 'Pages created by banned users while they were banned'
	});
	if (!multiple) {
		result.push({
			label: 'G6: History merge', 
			value: 'histmerge',
			tooltip: 'Temporarily deleting a page in order to merge page histories' 
		});
		result.push({
			label: 'G6: Move', 
			value: 'move',
			tooltip: 'Making way for a noncontroversial move like reversing a redirect' 
		});
		result.push({
			label: 'G6: Afd',
			value: 'afd',
			tooltip: 'An admin has closed an Articles for deletion debate as a "delete"'
		});
	}
	result.push({
		label: 'G6: Housekeeping',
		value: 'g6',
		tooltip: 'Other non-controversial "housekeeping" tasks'
	});
	result.push({
		label: 'G7: Author requests deletion',
		value: 'author',
		tooltip: 'Any page for which deletion is requested by the original author in good faith, provided the page\'s only substantial content was added by its author'
	});
	if (!multiple) result.push({
		label: 'G7: Author blanked',
		value: 'blanked',
		tooltip: ' If the author blanks the page, this can be taken as a deletion request'
	});
	result.push({
		label: 'G8: Pages dependent on a non-existent or deleted page',
		value: 'g8',
		tooltip: 'such as talk pages with no corresponding subject page; subpages with no parent page; file pages without a corresponding file; redirects to invalid targets, such as nonexistent targets, redirect loops, and bad titles; or categories populated by deleted or retargeted templates. This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
	});
	if (!multiple) {
		result.push({
			label: 'G8: Talk pages with no corresponding subject page',
			value: 'talk',
			tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
		});
		result.push({
			label: 'G8: Subpages with no parent page',
			value: 'subpage',
			tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
		});
		result.push({
			label: 'G8: Redirects to invalid targets, such as nonexistent targets, redirect loops, and bad titles',
			value: 'redirnone',
			tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
		});
		result.push({
			label: 'G8: Categories populated by deleted or retargeted templates',
			value: 'templatecat',
			tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
		});
	}
	result.push({ 
		label: 'G10: Attack page',
		value: 'attack', 
		tooltip: 'Pages that serve no purpose but to disparage their subject or some other entity (e.g., "John Q. Doe is an imbecile"). This includes a biography of a living person that is negative in tone and unsourced, where there is no NPOV version in the history to revert to. Administrators deleting such pages should not quote the content of the page in the deletion summary!'
	});
	result.push({ 
		label: 'G11: Unambiguous advertising',
		value: 'spam', 
		tooltip: 'Pages which exclusively promote a company, product, group, service, or person and which would need to be fundamentally rewritten in order to become encyclopedic. Note that simply having a company, product, group, service, or person as its subject does not qualify an article for this criterion; an article that is blatant advertising should have inappropriate content as well'
	});
	result.push({ 
		label: 'G12: Unambiguous copyright infringement', 
		value: 'copyvio', 
		tooltip: 'Either, 1: Material was copied from another website that does not have a license compatible with Wikipedia, or is photography from a stock photo seller (such as Getty Images or Corbis) or other commercial content provider; 2: There is no non-infringing content in the page history worth saving; or 3: The infringement was introduced at once by a single person rather than created organically on wiki and then copied by another website such as one of the many Wikipedia mirrors' 
	});
	return result;
}

twinklespeedy.redirectList = [
	{ 
		label: 'R2: Redirects from mainspace to any other namespace except the Category:, Template:, Wikipedia:, Help: and Portal: namespaces', 
		value: 'rediruser', 
		tooltip: '(this does not include the Wikipedia shortcut pseudo-namespaces). If this was the result of a page move, consider waiting a day or two before deleting the redirect'
	},
	{ 
		label: 'R3: Redirects as a result of an implausible typo that were recently created', 
		value: 'redirtypo', 
		tooltip: 'However, redirects from common misspellings or misnomers are generally useful, as are redirects in other languages'
	}
];

twinklespeedy.normalizeHash = {
	'reason': 'db',
	'multiple': 'multiple',
	'multiple-finish': 'multiple-finish',
	'nonsense': 'g1',
	'test': 'g2',
	'vandalism': 'g3',
	'hoax': 'g3',
	'pagemove': 'g3',
	'repost': 'g4',
	'banned': 'g5',
	'histmerge': 'g6',
	'move': 'g6',
	'afd': 'g6',
	'g6': 'g6',
	'author': 'g7',
	'blanked': 'g7',
	'g8': 'g8',
	'talk': 'g8',
	'subpage': 'g8',
	'redirnone': 'g8',
	'templatecat': 'g8',
	'attack': 'g10',
	'spam': 'g11',
	'copyvio': 'g12',
	'nocontext': 'a1',
	'foreign': 'a2',
	'nocontent': 'a3', 
	'transwiki': 'a5',
	'a7': 'a7',
	'person': 'a7',
	'corp': 'a7',
	'web': 'a7',
	'band': 'a7',
	'club': 'a7',
	'a9': 'a9',
	'a10': 'a10',
	'rediruser': 'r2',
	'redirtypo': 'r3',
	'redundantimage': 'f1',
	'noimage': 'f2',
	'noncom': 'f3',
	'unksource': 'f4',
	'unfree': 'f5',
	'norat': 'f6',
	'badfairuse': 'f7',
	'nowcommons': 'f8',
	'imgcopyvio': 'f9',
	'badfiletype': 'f10',
	'nopermission': 'f11',
	'catempty': 'c1',
	'userreq': 'u1',
	'nouser': 'u2',
	'gallery': 'u3',
	'policy':'t2',
	't3':'t3',
	'emptyportal': 'p2'
};

// keep this synched with [[MediaWiki:Deletereason-dropdown]]
twinklespeedy.reasonHash = {
// General
	'nonsense': '[[WP:PN|Patent nonsense]], meaningless, or incomprehensible',
	'test': 'Test page',
	'vandalism': '[[WP:Vandalism|Vandalism]]',
	'hoax': 'Blatant [[WP:Do not create hoaxes|hoax]]',
	'pagemove': 'Redirect left behind from page move vandalism',
	'repost': 'Recreation of a page that was [[WP:DEL|deleted]] per a [[WP:XFD|deletion discussion]]',
	'banned': 'Creation by a [[WP:BLOCK|blocked]] or [[WP:BAN|banned]] user in violation of block or ban',
	'histmerge': 'Temporary deletion in order to merge page histories',
	'move': 'Making way for a non-controversial move',
	'afd': 'Deleting page per result of [[WP:XfD|deletion discussion]]',
	'g6': 'Housekeeping and routine (non-controversial) cleanup',
	'author': 'One author who has requested deletion or blanked the page',
	'blanked': 'One author who has requested deletion or blanked the page',
	'g8': 'Page dependent on a deleted or nonexistent page',
	'talk': '[[Help:Talk page|Talk page]] of a deleted or nonexistent page',
	'subpage': '[[WP:Subpages|Subpage]] of a deleted or nonexistent page',
	'redirnone': '[[Wikipedia:Redirect|redirect]] to a deleted or nonexistent page',
	'templatecat': 'Populated by deleted or retargeted templates',
	'attack': '[[WP:ATP|Attack page]] or negative unsourced [[WP:BLP|BLP]]',
	'spam': 'Unambiguous [[WP:ADS|advertising]] or promotion',
	'copyvio': 'Unambiguous [[WP:C|copyright infringement]]',
// Articles
	'nocontext': 'Not enough context to identify article\'s subject',
	'foreign': 'Article in a foreign language that exists on another project',
	'nocontent': 'Article that has no meaningful, substantive content', 
	'transwiki': 'Article that has been transwikied to another project',
	'a7': 'No explanation of the subject\'s significance (real person, animal, organization, or web content)',
	'person' : 'No explanation of the subject\'s significance (real person)',
	'web': 'No explanation of the subject\'s significance (web content)',
	'corp': 'No explanation of the subject\'s significance (organization)',
	'club': 'No explanation of the subject\'s significance (organization)',
	'band': 'No explanation of the subject\'s significance (band/musician)',
	'a9': 'Music recording by redlinked artist and no indication of importance or significance',
	'a10': 'Recently created article that duplicates an existing topic',
// Images and media
	'redundantimage': 'File  redundant to another on Wikipedia',
	'noimage': 'Corrupt or empty file, or a file description page for a file on Commons',
	'noncom': 'File with improper license',
	'unksource': 'Lack of licensing information',
	'unfree': 'Unused non-free media',
	'norat': 'Non-free file without [[WP:RAT|fair-use rationale]]',
	'badfairuse': '[[WP:NFCC|Invalid]] fair-use claim',
	'nowcommons': 'Media file available on Commons',
	'imgcopyvio': 'File [[WP:COPYVIO|copyright violation]]',
	'badfiletype': 'Useless media file',
	'nopermission': 'No evidence of permission',
// Categories
	'catempty': 'Empty category',
// User pages
	'userreq': 'User request to delete page in own userspace',
	'nouser': 'Userpage or subpage of a nonexistent user',
	'gallery': '[[WP:NFC|Non-free]] [[Help:Gallery|gallery]]',
// Templates
	'policy': 'Template that unambiguously misrepresents established policy',
	't3': 'Unused, redundant template',
// Portals
	'emptyportal': '[[WP:P|Portal]] without a substantial topic base',
// Redirects
	'rediruser': 'Cross-[[WP:NS|namespace]] [[WP:R|redirect]] from mainspace',
	'redirtypo': 'Recently created, implausible [[WP:R|redirect]]'
};

twinklespeedy.callbacks = {
	sysop: {
		main: function( self ) {
			var xmlDoc = self.responseXML;
			var normal = xmlDoc.evaluate( '//normalized/n/@to', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
			if( normal ) {
				wgPageName = normal;
			}
			var exists = xmlDoc.evaluate( 'boolean(//pages/page[not(@missing)])', xmlDoc, null, XPathResult.BOOLEAN_TYPE, null ).booleanValue;

			if( ! exists ) {
				self.statelem.error( "It seems that the page doesn't exist, perhaps it has already been deleted" );
				return;
			}

			if( self.params.openusertalk ) {
				// Open talk page of first contributor
				var query = {
					'action': 'query',
					'prop': 'revisions',
					'titles': wgPageName,
					'rvlimit': 1,
					'rvprop': 'user',
					'rvdir': 'newer'
				}

				var wikipedia_api = new Wikipedia.api( 'Grabbing username of initial contributor', query, twinklespeedy.callbacks.sysop.openUserTalkPage );
				wikipedia_api.params = self.params;
				wikipedia_api.post();
			}
			
			var query = { 
				'title': wgPageName, 
				'action': 'delete'
			};

			var wikipedia_wiki = new Wikipedia.wiki( 'Deleting page', query, twinklespeedy.callbacks.sysop.deletePage );
			wikipedia_wiki.params = self.params;
			wikipedia_wiki.followRedirect = false;
			wikipedia_wiki.get();

			if( 
				TwinkleConfig.deleteTalkPageOnDelete && 
				self.params.normalized != 'f8' &&
				wgNamespaceNumber % 2 == 0 && 
				wgNamespaceNumber != Namespace.USER && 
				document.getElementById( 'ca-talk' ).className != 'new' 
			) {
				var talk_page = namespaces[ wgNamespaceNumber  + 1 ] + ':' + wgTitle;
				var query = query = {
					'title': talk_page,
					'action': 'delete'
				};
				var wikipedia_wiki = new Wikipedia.wiki( 'Deleting talk page', query, twinklespeedy.callbacks.sysop.deleteTalkPage );
				wikipedia_wiki.params = self.params;
				wikipedia_wiki.followRedirect = false;
				wikipedia_wiki.get();
			}

			if( wgNamespaceNumber == 6 && self.params.normalized != 'f8' ) {
				var query = {
					'action': 'query',
					'list': 'imageusage',
					'titles': wgPageName,
					'iulimit': userIsInGroup( 'sysop' ) ? 5000 : 500 // 500 is max for normal users, 5000 for bots and sysops
				};
				var wikipedia_api = new Wikipedia.api( 'Grabbing file links', query, twinklespeedy.callbacks.sysop.unlinkImageInstancesMain );
				wikipedia_api.params = self.params;
				wikipedia_api.post();
			}
			var doOrphan = TwinkleConfig.orphanBacklinksOnSpeedyDelete;
			if( 
				doOrphan.orphan && 
				doOrphan.exclude.indexOf( self.params.normalized.toLowerCase() ) == -1 
			) {
				var query = {
					'action': 'query',
					'list': 'backlinks',
					'blfilterredir': 'nonredirects',
					'bltitle': wgPageName,
					'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500, // 500 is max for normal users, 5000 for bots and sysops
					'blnamespace': [0, 100] // Main namespace and portal namespace only, keep on talk pages.
				};
				var wikipedia_api = new Wikipedia.api( 'Grabbing backlinks', query, twinklespeedy.callbacks.sysop.unlinkBacklinksMain );
				wikipedia_api.params = self.params;
				wikipedia_api.post();
			}
			var query = {
				'action': 'query',
				'list': 'backlinks',
				'blfilterredir': 'redirects',
				'bltitle': wgPageName,
				'bllimit': userIsInGroup( 'sysop' ) ? 5000 : 500 // 500 is max for normal users, 5000 for bots and sysops
			};
			var wikipedia_api = new Wikipedia.api( 'Grabbing redirects', query, twinklespeedy.callbacks.sysop.deleteRedirectsMain );
			wikipedia_api.params = self.params;
			wikipedia_api.post();

		},
		openUserTalkPage: function( self ) {
			var xmlDoc = self.responseXML;
			var user = xmlDoc.evaluate( '//rev/@user', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
			var statusIndicator = new Status('Opening user talk page edit form for user ' + user, 'opening');
			
			var query = {
				'title': 'User talk:' + user,
				'action': 'edit',
				'preview': 'yes',
				'vanarticle': wgPageName.replace(/_/g, ' ')
			};
			switch( TwinkleConfig.userTalkPageMode ) {
			case 'tab':
				window.open( wgServer + wgScriptPath + '/index.php?' + QueryString.create( query ), '_tab' );
				break;
			case 'blank':
				window.open( wgServer + wgScriptPath + '/index.php?' + QueryString.create( query ), '_blank', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
				break;
			case 'window':
				default :
				window.open( wgServer + wgScriptPath + '/index.php?' + QueryString.create( query ), 'twinklewarnwindow', 'location=no,toolbar=no,status=no,directories=no,scrollbars=yes,width=1200,height=800' );
				break;
			}
			
			statusIndicator.info( 'complete' );
		},
		unlinkBacklinksMain: function( self ) {
			var xmlDoc = self.responseXML;
			var snapshot = xmlDoc.evaluate('//backlinks/bl/@title', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

			if( snapshot.snapshotLength == 0 ) {
				return;
			}

			var statusIndicator = new Status('Removing backlinks', '0%');

			var total = snapshot.snapshotLength * 2;

			var onsuccess = function( self ) {
				var obj = self.params.obj;
				var total = self.params.total;
				var now = parseInt( 100 * ++(self.params.current)/total ) + '%';
				obj.update( now );
				self.statelem.unlink();
				if( self.params.current >= total ) {
					obj.info( now + ' (completed)' );
					Wikipedia.removeCheckpoint();
				}
			}
			var onloaded = onsuccess;

			var onloading = function( self ) {}


			Wikipedia.addCheckpoint();
			if( snapshot.snapshotLength == 0 ) {
				statusIndicator.info( '100% (completed)' );
				Wikipedia.removeCheckpoint();
				return;
			}

			var params = clone( self.params );
			params.current = 0;
			params.total = total;
			params.obj = statusIndicator;
			params.page = wgPageName;


			for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
				var title = snapshot.snapshotItem(i).value;
				var query = {
					'title': title,
					'action': 'submit'
				}
				var wikipedia_wiki = new Wikipedia.wiki( "Unlinking on " + title, query, twinklespeedy.callbacks.sysop.unlinkBacklinks );
				wikipedia_wiki.params = params;
				wikipedia_wiki.onloading = onloading;
				wikipedia_wiki.onloaded = onloaded;
				wikipedia_wiki.onsuccess = onsuccess;
				wikipedia_wiki.get();
			}
		},
		unlinkBacklinks: function( self ) {
			var form = self.responseXML.getElementById('editform');
			var text = form.wpTextbox1.value;
			var old_text = text;
			var wikiPage = new Mediawiki.Page( text );
			wikiPage.removeLink( self.params.page );

			text = wikiPage.getText();
			if( text == old_text ) {
				// Nothing to do, return
				self.onsuccess( self );
				Wikipedia.actionCompleted( self );
				return;
			}
			var postData = {
				'wpMinoredit': form.wpMinoredit.checked ? '' : undefined,
				'wpWatchthis': undefined,
				'wpStarttime': form.wpStarttime.value,
				'wpEdittime': form.wpEdittime.value,
				'wpAutoSummary': form.wpAutoSummary.value,
				'wpEditToken': form.wpEditToken.value,
				'wpSection': '',
				'wpSummary': 'Removing backlinks to ' + self.params.page + " that has been speedily deleted per ([[WP:CSD#" + self.params.normalized.toUpperCase() + "|CSD " + self.params.normalized.toUpperCase() + "]])" + ". " + TwinkleConfig.deletionSummaryAd,
				'wpTextbox1': text
			};
			self.post( postData );
		},
		deleteRedirectsMain: function( self ) {
			var xmlDoc = self.responseXML;
			var snapshot = xmlDoc.evaluate('//backlinks/bl/@title', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

			var total = snapshot.snapshotLength * 2;

			if( snapshot.snapshotLength == 0 ) {
				return;
			}

			var statusIndicator = new Status('Deleting redirects', '0%');

			var onsuccess = function( self ) {
				var obj = self.params.obj;
				var total = self.params.total;
				var now = parseInt( 100 * ++(self.params.current)/total ) + '%';
				obj.update( now );
				self.statelem.unlink();
				if( self.params.current >= total ) {
					obj.info( now + ' (completed)' );
					Wikipedia.removeCheckpoint();
				}
			}
			var onloaded = onsuccess;

			var onloading = function( self ) {}


			Wikipedia.addCheckpoint();
			if( snapshot.snapshotLength == 0 ) {
				statusIndicator.info( '100% (completed)' );
				Wikipedia.removeCheckpoint();
				return;
			}

			var params = clone( self.params );
			params.current = 0;
			params.total = total;
			params.obj = statusIndicator;


			for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
				var title = snapshot.snapshotItem(i).value;
				var query = {
					'title': title,
					'action': 'delete'
				}
				var wikipedia_wiki = new Wikipedia.wiki( "Deleting " + title, query, twinklespeedy.callbacks.sysop.deleteRedirects );
				wikipedia_wiki.params = params;
				wikipedia_wiki.onloading = onloading;
				wikipedia_wiki.onloaded = onloaded;
				wikipedia_wiki.onsuccess = onsuccess;
				wikipedia_wiki.followRedirect = false;
				wikipedia_wiki.get();
			}
		},
		deleteRedirects: function( self ) {
			var form = this.responseXML.getElementById( 'deleteconfirm' );
			if( ! form ) { // Hell, file deletion is b0rked :(
				form = this.responseXML.getElementsByTagName( 'form' )[0];
				var postData = {
					'wpDeleteReasonList': 'other',
					'wpReason': "[[WP:CSD#G8|G8]]: Redirect to deleted page \"" + wgPageName + "\" " + TwinkleConfig.deletionSummaryAd,
					'wpEditToken': form.wpEditToken.value
				}
			} else {

				var postData = {
					'wpWatch': form.wpWatch.checked ? '' : undefined,
					'wpDeleteReasonList': 'other',
					'wpReason': "[[WP:CSD#G8|G8]]: Redirect to deleted page \"" + wgPageName + "\" " + TwinkleConfig.deletionSummaryAd,
					'wpEditToken': form.wpEditToken.value
				}
			}
			self.post( postData );
		},
		unlinkImageInstancesMain: function( self ) {
			var xmlDoc = self.responseXML;
			var snapshot = xmlDoc.evaluate('//imageusage/iu/@title', xmlDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

			if( snapshot.snapshotLength == 0 ) {
				return;
			}

			var statusIndicator = new Status('Unlinking file instances ', '0%');

			var total = snapshot.snapshotLength * 2;

			var onsuccess = function( self ) {
				var obj = self.params.obj;
				var total = self.params.total;
				var now = parseInt( 100 * ++(self.params.current)/total ) + '%';
				obj.update( now );
				self.statelem.unlink();
				if( self.params.current >= total ) {
					obj.info( now + ' (completed)' );
					Wikipedia.removeCheckpoint();
				}
			}
			var onloaded = onsuccess;

			var onloading = function( self ) {}


			Wikipedia.addCheckpoint();
			if( snapshot.snapshotLength == 0 ) {
					statusIndicator.info( '100% (completed)' );
					Wikipedia.removeCheckpoint();
					return;
			}

			var params = clone( self.params );
			params.current = 0;
			params.total = total;
			params.obj = statusIndicator;
			params.image = wgTitle;

			for ( var i = 0; i < snapshot.snapshotLength; ++i ) {
				var title = snapshot.snapshotItem(i).value;
				var query = {
					'title': title,
					'action': 'submit'
				}
				var wikipedia_wiki = new Wikipedia.wiki( "Unlinking on " + title, query, twinklespeedy.callbacks.sysop.unlinkImageInstances );
				wikipedia_wiki.params = params;
				wikipedia_wiki.onloading = onloading;
				wikipedia_wiki.onloaded = onloaded;
				wikipedia_wiki.onsuccess = onsuccess;
				wikipedia_wiki.get();
			}
		},
		unlinkImageInstances: function( self ) {
			var form = self.responseXML.getElementById('editform');
			var text = form.wpTextbox1.value;
			var old_text = text;
			var wikiPage = new Mediawiki.Page( text );
			wikiPage.commentOutImage( self.params.image, 'Commented out because file was deleted' );

			text = wikiPage.getText();
			if( text == old_text ) {
				// Nothing to do, return
				self.onsuccess( self );
				Wikipedia.actionCompleted( self );
				return;
			}
			var postData = {
				'wpMinoredit': form.wpMinoredit.checked ? '' : undefined,
				'wpWatchthis': undefined,
				'wpStarttime': form.wpStarttime.value,
				'wpEdittime': form.wpEdittime.value,
				'wpAutoSummary': form.wpAutoSummary.value,
				'wpEditToken': form.wpEditToken.value,
				'wpSection': '',
				'wpSummary': 'Removing instance of file ' + self.params.image + " that has been speedily deleted per [[WP:CSD#" + self.params.normalized.toUpperCase() + "|CSD " + self.params.normalized.toUpperCase() + "]]" + ". " + TwinkleConfig.deletionSummaryAd,
				'wpTextbox1': text
			};
			self.post( postData );
		},
		deletePage: function( self ) {
			var form = this.responseXML.getElementById( 'deleteconfirm' );
			if( ! form ) { // Hell, file deletion is b0rked :(
				form = this.responseXML.getElementsByTagName( 'form' )[0];
				var postData = {
					'wpDeleteReasonList': 'other',
					'wpReason': "[[WP:CSD#" + self.params.normalized.toUpperCase() + "|" + self.params.normalized.toUpperCase() + "]]: " + self.params.reason + " " + TwinkleConfig.deletionSummaryAd,
					'wpEditToken': form.wpEditToken.value
				}
				self.post( postData );
			} else {

				var postData = {
					'wpWatch': (self.params.watch || form.wpWatch.checked) ? '' : undefined,
					'wpDeleteReasonList': 'other',
					'wpReason': "[[WP:CSD#" + self.params.normalized.toUpperCase() + "|" + self.params.normalized.toUpperCase() + "]]: " + self.params.reason + " " + TwinkleConfig.deletionSummaryAd,
					'wpEditToken': form.wpEditToken.value
				}
				self.post( postData );
			}
		},
		deleteTalkPage: function( self ) {
			form = this.responseXML.getElementById( 'deleteconfirm' );

			var postData = {
				'wpWatch': (self.params.watch || form.wpWatch.checked) ? '' : undefined,
				'wpDeleteReasonList': 'other',
				'wpReason': "[[WP:CSD#G8|G8]]: Talk page of deleted page \"" + wgPageName + "\" " + TwinkleConfig.deletionSummaryAd,
				'wpEditToken': form.wpEditToken.value
			}
			self.post( postData );
		}
	},
	
	
	
	
	
	user: {
		main: function( self ) {
			var xmlDoc = self.responseXML;

			var exists = xmlDoc.evaluate( 'boolean(//pages/page[not(@missing)])', xmlDoc, null, XPathResult.BOOLEAN_TYPE, null ).booleanValue;

			if( ! exists ) {
				self.statelem.error( "It seems that the page doesn't exist, perhaps it has already been deleted" );
				return;
			}
			var query = { 
				'title': wgPageName, 
				'action': 'submit'
			};

			var wikipedia_wiki = new Wikipedia.wiki( 'Tagging page', query, twinklespeedy.callbacks.user.tagPage );
			wikipedia_wiki.params = self.params;
			wikipedia_wiki.followRedirect = false;
			wikipedia_wiki.get();
		},
		tagPage: function( self ) {
			form = this.responseXML.getElementById( 'editform' );

			var text = form.wpTextbox1.value;

			self.statelem.status( 'Checking for tags on the page...' );

			// check for existing deletion tags
			var tag = /(\{\{\s*(?:db|delete|db-.*?)(?:\||\s*\}\}))/.exec( text );
			if( tag ) {
				self.statelem.error( [ htmlNode( 'strong', tag[0] ) , " is already placed on the page." ] )
				return;
			}

			var xfd = /(\{\{(?:[rsaiftcm]fd|md1)[^{}]*?\}\})/i.exec( text );
			if( xfd && !confirm( "The deletion related template " + xfd[0] + " is already present on the page, do you still want to apply CSD template?" ) ) {
				return;
			}
			
			var code;
			var parameters;
			if (self.params.normalized == 'multiple')
			{
				code = "\{\{db-multiple";
				for (var i in twinklespeedy.dbmultipleCriteria)
					if (typeof twinklespeedy.dbmultipleCriteria[i] == 'string')
						code += "|" + twinklespeedy.dbmultipleCriteria[i].toUpperCase();
				for (var i in twinklespeedy.dbmultipleParameters)
					if (typeof twinklespeedy.dbmultipleParameters[i] == 'string')
						code += "|" + i + "=" + twinklespeedy.dbmultipleParameters[i];
				code += "\}\}";
				self.params.utparams = [];
			}
			else
			{
				parameters = twinklespeedy.getParameters(self.params.value, self.params.normalized, self.statelem);
				if (!parameters) return;
				code = "\{\{db-" + self.params.value;
				for (var i in parameters)
					if (typeof parameters[i] == 'string')
						code += "|" + i + "=" + parameters[i];
				code += "\}\}";
				self.params.utparams = twinklespeedy.getUserTalkParameters(self.params.normalized, parameters);
			}	

			if( TwinkleConfig.markSpeedyPagesAsPatrolled && self.params.rcid != '' ) {
				// extract patrol token from "Mark page as patrolled" link on page
				var patrollinkmatch = /token=(.+)%2B%5C$/.exec($('.patrollink a').attr('href'));
				
				if (patrollinkmatch) {
					var patroltoken = patrollinkmatch[1] + "+\\";
					var patrolstat = new Status("Marking page as patrolled", "Doing...");
					(Wikipedia.numberOfActionsLeft)++;

					var query = {
						'title': wgPageName,
						'action': 'markpatrolled',
						'rcid': self.params.rcid,
						'token': patroltoken
					};

					jQuery.ajax( {
						context: patrolstat,
						type: 'GET',
						url: wgServer + wgScriptPath + '/index.php', 
						data: QueryString.create(query),
						dataType: 'xml',
						success: function(xml, textStatus, jqXHR) {
							this.info(textStatus);
							Wikipedia.actionCompleted();
						},
						error: function(jqXHR, textStatus, errorThrown) {
							if (textStatus == "parsererror") { // kludge for Firefox 4.0b12
								this.info("Done");
								Wikipedia.actionCompleted();
							} else {
								this.error(textStatus + ': ' + errorThrown + ' occurred while trying to mark as patrolled.');
							}
						}
					} );
				}
			}

			// Notification to first contributor
			var query = {
				'action': 'query',
				'prop': 'revisions',
				'titles': wgPageName,
				'rvlimit': 1,
				'rvprop': 'user',
				'rvdir': 'newer'
			}
			var callback = function( self ) {
				var xmlDoc = self.responseXML;
				var user = xmlDoc.evaluate( '//rev/@user', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
				if( wgPageName != ( 'User talk:' + user ) ) {
					var query = {
						'title': 'User talk:' + user,
						'action': 'submit'
					};
					var wikipedia_wiki = new Wikipedia.wiki( 'Notifying of initial contributor (' + user + ')', query, twinklespeedy.callbacks.user.userNotification );
					wikipedia_wiki.params = self.params;
					wikipedia_wiki.get();
				} else {
					Status.info( 'Info', 'Current page is initial contributor\'s talk page, aborting notification' );
				}
			}

			if( self.params.usertalk ) {
				var wikipedia_api = new Wikipedia.api( 'Grabbing data of initial contributor', query, callback );
				wikipedia_api.params = self.params;
				wikipedia_api.post();
			}

			//wrap SD template in noinclude tags if we are in template space.
			//won't work with userboxes in userspace, or any other transcluded page outside template space
			if (self.params.wgCanonicalNamespace == "Template") code = "<noinclude>" + code + "</noinclude>";

			//Remove tags that become superfluous with this action
			text = text.replace(/{\{\s*(New unreviewed article|Userspace draft)\s*(\|(?:{{[^{}]*}}|[^{}])*)?}}\s*/ig, "");

			// Generate edit summary for edit
			var editsummary;
			switch (self.params.normalized)
			{
				case 'db':
					editsummary = 'Requesting [[WP:CSD|speedy deletion]] with rationale \"' + parameters["1"] + '\".';
					break;
				case 'multiple':
					editsummary = 'Requesting speedy deletion (';
					for (var i in twinklespeedy.dbmultipleCriteria)
						if (typeof twinklespeedy.dbmultipleCriteria[i] == 'string')
							editsummary += '[[WP:CSD#' + twinklespeedy.dbmultipleCriteria[i].toUpperCase() + '|CSD ' + twinklespeedy.dbmultipleCriteria[i].toUpperCase() + ']], ';
					editsummary = editsummary.substr(0, editsummary.length - 2); // remove trailing comma
					editsummary += ').';
					break;
				default:
					editsummary = "Requesting speedy deletion ([[WP:CSD#" + self.params.normalized.toUpperCase() + "|CSD " + self.params.normalized.toUpperCase() + "]]).";
					break;
			}

			var postData = {
				'wpMinoredit': TwinkleConfig.markSpeedyPagesAsMinor ? '' : undefined,
				'wpWatchthis': (self.params.watch || form.wpWatchthis.checked ) ? '' : undefined,
				'wpStarttime': form.wpStarttime.value,
				'wpEdittime': form.wpEdittime.value,
				'wpAutoSummary': form.wpAutoSummary.value,
				'wpEditToken': form.wpEditToken.value,
				'wpSection': '',
				'wpSummary': editsummary + TwinkleConfig.summaryAd,
				'wpTextbox1': code + ((self.params.normalized == 'g10' || twinklespeedy.dbmultipleCriteria.indexOf('g10') != -1) ?
					'' : ("\n" + text) ) // cause attack pages to be blanked
			};
			self.post( postData );
		},
		userNotification: function( self ) {
			var nowelcome = TwinkleConfig.welcomeUserOnSpeedyDeletionNotification.indexOf( self.params.normalized ) == -1;
			var form = self.responseXML.getElementById( 'editform' );
			var text = form.wpTextbox1.value;
			
			// specialcase "db" and "db-multiple"
			// XXX modify the "db-csd-notice-custom" template to cater for these special cases
			switch (self.params.normalized)
			{
				case 'db':
					text += "\n\{\{subst:db-reason-notice|1=" + wgPageName;
					break;
				case 'multiple':
					text += "\n\{\{subst:db-notice-multiple|1=" + wgPageName;
					break;
				default:
					text += "\n\{\{subst:db-csd-notice-custom|1=" + wgPageName + "|2=" + self.params.value;
					break;
			}
			for (var i in self.params.utparams)
				if (typeof self.params.utparams[i] == 'string')
					text += "|" + i + "=" + self.params.utparams[i];
			text += (nowelcome ? "|nowelcome=yes" : "") + "\}\} \~\~\~\~";
			
			var postData = {
				'wpMinoredit': form.wpMinoredit.checked ? '' : undefined,
				'wpWatchthis': form.wpWatchthis.checked ? '' : undefined,
				'wpStarttime': form.wpStarttime.value,
				'wpEdittime': form.wpEdittime.value,
				'wpAutoSummary': form.wpAutoSummary.value,
				'wpEditToken': form.wpEditToken.value,
				'wpSection': '',
				'wpSummary': 'Notification: Speedy deletion nomination of \[\[' + wgPageName + '\]\].' + TwinkleConfig.summaryAd,
				'wpTextbox1': text
			};
			self.post( postData );
		}
	}
}

// prompts user for parameters to be passed into the speedy deletion tag
twinklespeedy.getParameters = function twinklespeedyGetParameters(value, normalized, statelem)
{
	var parameters = [];
	switch( normalized ) {
		case 'db':
			var rationale = prompt('Please enter a mandatory rationale.   \n\"This page qualifies for speedy deletion because:\"');
			if (rationale == null || rationale.replace(/^\s*/, "").replace(/\s*$/, "") == '')
			{
				statelem.error( 'You must specify a rationale.  Aborted by user.' );
				return;
			}
			if (rationale != '') parameters["1"] = rationale;
			break;
		case 'u1':
			var rationale = '';
			if (wgNamespaceNumber==3 && !(/\//.test(wgTitle)))
			{
				var rationale = prompt('Please provide a mandatory rationale to explain why this user talk page should be deleted:');
				if (rationale == null || rationale.replace(/^\s*/, "").replace(/\s*$/, "") == '')
				{
					statelem.error( 'Aborted by user.' );
					return;
				}
			}
			if (rationale != '') parameters["rationale"] = rationale;
			break;
		case 'f8':
			var pagenamespaces = wgPageName.replace( '_', ' ' );
			var filename = prompt( 'Please enter the name of the file on Commons:', pagenamespaces );
			if (filename == null)
			{
				statelem.error( 'Aborted by user.' );
				return;
			}
			if (filename != '' && filename != pagenamespaces)
			{
				if (filename.indexOf("Image:") == 0 || filename.indexOf("File:") == 0)
				{
					parameters["1"] = filename;
				}
				else
				{
					statelem.error("The File: prefix was missing from the image filename.  Aborted.");
					return;
				}
			}
			parameters["date"] = "\~\~\~\~\~";
			break;
		case 'g6':
			var rationale = null;
			switch( value ) {
				case 'histmerge':
					var title = prompt( 'Please enter the title to merge into:' );
					if (title == null)
					{
						statelem.error( 'Aborted by user.' );
						return;
					}
					parameters["1"] = title;
					break;
				case 'move':
					var title = prompt( 'Please enter the title of the page to be moved here:' );
					if (title == null)
					{
						statelem.error( 'Aborted by user.' );
						return;
					}
					var reason = prompt( 'Please enter the reason for the page move:' );
					if (reason == null)
					{
						self.statelem.error( 'Aborted by user.' );
						return;
					}
					parameters["1"] = title;
					parameters["2"] = reason;
					break;
				case 'g6':
					rationale = prompt( 'Please provide an optional rationale (leave empty to skip):' );
					if (rationale == null)
					{
						statelem.error( 'Aborted by user.' );
						return;
					}
					if (rationale != '') parameters["rationale"] = rationale; 
					break;
			}
			break;
		case 'g7':
			var rationale = prompt('Please provide an optional rationale (perhaps linking to where the author requested this deletion - leave empty to skip):');
			if (rationale == null)
			{
				statelem.error( 'Aborted by user.' );
				return;
			}
			if (rationale != '') parameters["rationale"] = rationale; 
			break;
		case 'f9':
		case 'g12':
			var url = prompt( 'Please enter the URL if available, including the "http://":' );
			if (url == null)
			{
				statelem.error( 'Aborted by user.' );
				return;
			}
			parameters["url"] = url;
			break;
		case 'a2':
			var source = prompt('Enter an interwiki link to the article on the foreign-language wiki (for example, "fr:Bonjour"):');
			if (source == null)
			{
				statelem.error('Aborted by user.');
				return;
			}
			parameters["source"] = source;
			break;
		case 'a10':
			var title = prompt( 'Enter the article name that is duplicated:' );
			if (title == null)
			{
				statelem.error( 'Aborted by user.' );
				return;
			}
			parameters["article"] = title;
			break;
		case 'f1':
			var img = prompt( 'Enter the file this is redundant to, excluding the "Image:" or "File:" prefix:' );
			if (img == null)
			{
				statelem.error( 'Aborted by user.' );
				return;
			}
			parameters["filename"] = img;
			break;
		case 't3':
			var template = prompt( 'Enter the template this is redundant to, excluding the "Template:" prefix:' );
			if (template == null)
			{
				statelem.error( 'Aborted by user.' );
				return;
			}
			parameters["1"] = "\~\~\~\~\~";
			parameters["2"] = template;
			break;
		case 'g10':
			parameters["blanked"] = 'yes';
			// it is actually blanked elsewhere in code, but setting the flag here
			break;
	}
	return parameters;
}

// function for processing talk page notification template parameters
twinklespeedy.getUserTalkParameters = function twinklespeedyGetUserTalkParameters(normalized, parameters)
{
	var utparams = [];
	switch (normalized)
	{
		case 'db':
			utparams["2"] = parameters["1"];
			break;
		case 'a10':
			utparams["key1"] = "article";
			utparams["value1"] = parameters["article"];
			break;
	}
	return utparams;
}

twinklespeedy.callback.evaluateSysop = function twinklespeedyCallbackEvaluateSysop(e)
{
	wgPageName = wgPageName.replace( /_/g, ' ' ); // for queen/king/whatever and country!

	var tag_only = e.target.form.tag_only;
	if( tag_only && tag_only.checked ) {
		return twinklespeedy.callback.evaluateUser(e);
	}

	var value = e.target.value;
	var normalized = twinklespeedy.normalizeHash[ value ];

	var params = {
		value: value,
		normalized: normalized,
		watch: TwinkleConfig.watchSpeedyPages.indexOf( normalized ) != -1,
		reason: twinklespeedy.reasonHash[ value ],
		openusertalk: TwinkleConfig.openUserTalkPageOnSpeedyDelete.indexOf( normalized ) != -1
	};
	Status.init( e.target.form );

	var query = {
		'action': 'query',
		'titles': wgPageName
	}
	var wikipedia_api = new Wikipedia.api( 'Checking if page exists', query, twinklespeedy.callbacks.sysop.main );
	wikipedia_api.params = params;
	wikipedia_api.post();
}

twinklespeedy.callback.evaluateUser = function twinklespeedyCallbackEvaluateUser(e) {
	wgPageName = wgPageName.replace( /_/g, ' ' ); // for queen/king/whatever and country!
	var value = e.target.value;
		
	if (value == 'multiple')
	{
		e.target.form.style.display = "none"; // give the user a cue that the dialog is being changed
		twinklespeedy.targetdialogcontent = e.target.form.parentNode; // make this accessible in scopeless setTimeout
		setTimeout("twinklespeedy.initDialog(twinklespeedy.callback.doMultiple, false, twinklespeedy.targetdialogcontent)", 150);
		return;
	}
	
	if (value == 'multiple-finish')
		value = 'multiple';
	else
	{
		// clear these out, whatever the case, to avoid errors
		twinklespeedy.dbmultipleCriteria = [];
		twinklespeedy.dbmultipleParameters = [];
	}
		
	var normalized = twinklespeedy.normalizeHash[ value ];

	// analyse each db-multiple criterion to determine whether to watch the page/notify the creator
	var watchPage = false;
	if (value == 'multiple')
	{
		for (var i in twinklespeedy.dbmultipleCriteria)
		{
			if (typeof twinklespeedy.dbmultipleCriteria[i] == 'string' && 
				TwinkleConfig.watchSpeedyPages.indexOf(twinklespeedy.dbmultipleCriteria[i]) != -1)
			{
				watchPage = true;
				break;
			}
		}
	}
	else watchPage = TwinkleConfig.watchSpeedyPages.indexOf(normalized) != -1;
	
	var notifyuser = false;
	if (value == 'multiple')
	{
		for (var i in twinklespeedy.dbmultipleCriteria)
		{
			if (typeof twinklespeedy.dbmultipleCriteria[i] == 'string' && 
				TwinkleConfig.notifyUserOnSpeedyDeletionNomination.indexOf(twinklespeedy.dbmultipleCriteria[i]) != -1)
			{
				notifyuser = true;
				break;
			}
		}
	}
	else notifyuser = (TwinkleConfig.notifyUserOnSpeedyDeletionNomination.indexOf(normalized) != -1) && e.target.form.notify.checked;
				
	var params = {
		value: value,
		normalized: normalized,
		watch: watchPage,
		usertalk: notifyuser,
		rcid: QueryString.exists( 'rcid' ) ? QueryString.get( 'rcid' ) : '',
		wgCanonicalNamespace : wgCanonicalNamespace
	};

	Status.init( e.target.form );

	Wikipedia.actionCompleted.redirect = wgPageName;
	Wikipedia.actionCompleted.notice = "Tagging complete";

	var query = {
		'action': 'query',
		'titles': wgPageName
	}

	var wikipedia_api = new Wikipedia.api( 'Checking if page exists', query, twinklespeedy.callbacks.user.main );
	wikipedia_api.params = params;
	wikipedia_api.post();
}

twinklespeedy.dbmultipleCriteria = [];
twinklespeedy.dbmultipleParameters = [];
twinklespeedy.callback.doMultiple = function twinklespeedyCallbackDoMultiple(e)
{
	var value = e.target.value;
	var normalized = twinklespeedy.normalizeHash[value];
	if (value != 'multiple-finish')
	{
		if (twinklespeedy.dbmultipleCriteria.indexOf(normalized) != -1)
			alert('You already selected that criterion. Please choose another.');
		else
		{
			var parameters = twinklespeedy.getParameters(value, normalized, Status);
			if (parameters)
			{
				for (var i in parameters)
					if (typeof parameters[i] == 'string')
						twinklespeedy.dbmultipleParameters[i] = parameters[i];
				twinklespeedy.dbmultipleCriteria.push(normalized);
			}
		}
		e.target.form.style.display = "none"; // give the user a cue that the dialog is being changed
		twinklespeedy.targetdialogcontent = e.target.form.parentNode; // make this accessible in scopeless setTimeout
		setTimeout("twinklespeedy.initDialog(twinklespeedy.callback.doMultiple, false, twinklespeedy.targetdialogcontent)", 150);
	}
	else
	{
		twinklespeedy.callback.evaluateUser(e);
	}
}