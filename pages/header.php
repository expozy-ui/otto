<?php if (!defined("_VALID_PHP")) { die('Direct access to this location is not allowed.'); } ?>
<!DOCTYPE html>
<html lang="<?= $lang->language ?>">
	<head>

		<!-- SEO PAGE SETTINGS  -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" >
		
		<title><?php echo $page->seo_title ?></title>
		<link rel="icon" type="image/x-icon" href="<?php echo $core->web['favicon'] ?>">
		<meta property="og:url" content="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" ?>" />
		<meta property="og:type" content="website" />
		<meta name="author" content="https://expozy.com/">



		<meta property="og:site_name" content="<?php echo $core->site_name ?>">

		<meta class="seo_title" property="og:title" content="<?php echo ($page->seo_title != '') ? $page->seo_title : $core->site_name ?>">
		<meta class="seo_title" name="twitter:title" content="<?php echo ($page->seo_title != '') ? $page->seo_title : $core->site_name ?>">
		<meta class="seo_description" name="description" content="<?php echo ($page->seo_description != '') ? $page->seo_description : $core->site_name ?> ">
		<meta class="seo_description" property="og:description" content="<?php echo ($page->seo_description != '') ? $page->seo_description : $core->site_name ?> ">
		<meta class="seo_description" name="twitter:description" content="<?php echo ($page->seo_description != '') ? $page->seo_description : $core->site_name ?>">
		<meta class="seo_image" name="thumbnail" content="<?php echo ($page->seo_image != '') ? $page->seo_image : $core->web['logo'] ?>">
		<meta class="seo_image" property="og:image" content="<?php echo ($page->seo_image != '') ? $page->seo_image : $core->web['logo'] ?>">
		<meta class="seo_image" name="twitter:image" content="<?php echo ($page->seo_image != '') ? $page->seo_image : $core->web['logo'] ?>">
		<meta class="seo_tags" name="keywords" content="<?php echo ($page->seo_tags != '') ? $page->seo_tags : $core->site_name ?>">

		<meta name="twitter:card" content="summary_large_image">



		<!--START META TAG FOR BING  -->
		<meta name="msvalidate.01" content="F2343A2EA0EE68B8F817CB128D3CD061" />
		<!--END META TAG FOR BING  -->


<!-- CORE SYSTEM SETTINGS -->
		<script type="text/javascript">
			const SITEURL = "<?php echo $core->site_url ?>";
			const LANG = "<?php echo $lang->language ?>";
			const SAAS_KEY = "<?php echo SAAS_KEY ?>";
			const COREURL = "<?php echo CORE_URL; ?>api/";
			const LOGGED_IN = "<?php echo $user->logged_in ?>";
			const USER_EMAIL = "<?php echo $user->email ?>";
			const USER = <?php echo json_encode($user, JSON_UNESCAPED_UNICODE) ?>;
			const LOGO_URL = "<?php echo $core->web['logo'] ?>";
			const FAVICON_URL = "<?php echo $core->web['favicon'] ?>";
			const SOCIAL_NETWORKS = <?php echo json_encode($core->web['links'], JSON_UNESCAPED_UNICODE) ?>;
			const URL_PARAMETERS = <?php unset($_GET['query_id']); echo json_encode($_GET) ?>;
			const SITENAME = <?php echo json_encode($core->site_name) ?>;
			const JS_VERSION = <?php echo JS_VERSION; ?>;
			const PAGEINIT = {id: <?= $page->id?>, target_id: <?= $page->target_id; ?>  };
		</script>




		<link href="<?php echo SITEURL. (isset($_SERVER['REDIRECT_URL']) ? $_SERVER['REDIRECT_URL'] : '') ?>" rel="canonical" />
		<!-- <script  src="/components/core/globals.js" charset="utf-8"></script> -->


		<!-- CORE SYSTEM SETTINGS -->
		<link rel="stylesheet" href="/assets/css/custom.css?v=<?php echo JS_VERSION ?>">
		<link href="<?= CBURL ?>assets/minimalist-blocks/content.css" rel="stylesheet" type="text/css" />
		<link href="<?= CBURL ?>box/box-flex.css" rel="stylesheet" type="text/css" />
		<!-- <link href="/assets/expozyBox/minimalist-blocks/content.css" rel="stylesheet" type="text/css" />
		<link href="/assets/expozyBox/box/box-flex.css" rel="stylesheet" type="text/css" /> -->

		<style media="screen">
		/* @font-face {
				font-family: 'Repo Regular';
				font-style: normal;
				font-weight: normal;
				src: local('Repo Regular'), url('/assets/fonts/repo/Repo.woff2') format('woff2');
				 font-display: swap;
				} */


		@font-face {
  		  font-family: 'Avenir';
   		  font-style: normal;
          font-weight: 500;
          src: local('Josefin Sans Regular'), url('/assets/fonts/avenir/AvenirNextCyr-Regular.woff2') format('woff2');
        }

   		@font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 300;
        src: local('Josefin Sans Thin'), url('/assets/fonts/avenir/AvenirNextCyr-Light.woff2') format('woff2');
        }
		@font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 200;
        src: local('Josefin Sans Thin'), url('/assets/fonts/avenir/AvenirNextCyr-UltraLightIt.woff2') format('woff2');
        }
		@font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 200;
        src: local('Josefin Sans Thin'), url('/assets/fonts/avenir/AvenirNextCyr-Thin.woff2') format('woff2');
        }

    
    @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 400;
        src: local('Josefin Sans Light'), url('/assets/fonts/avenir/AvenirNextCyr-Regular.woff2') format('woff2');
        }

        @font-face {
            font-family: 'Avenir';
            font-style: normal;
            font-weight: 600;
            src: local('Josefin Sans SemiBold'), url('/assets/fonts/avenir/AvenirNextCyr-Demi.woff2') format('woff2');
            }

            
    @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 700;
        src: local('Josefin Sans Bold'), url('/assets/fonts/avenir/AvenirNextCyr-Bold.woff2') format('woff2');
        }

		@font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 800;
        src: local('Josefin Sans Bold'), url('/assets/fonts/avenir/AvenirNextCyr-Heavy.woff2') format('woff2');
        }

		p,h1,h2,h3,h4,h5,h6,span,a,label{
			font-family: "Avenir";
			letter-spacing: 0.7px;
		}
		</style>
		

		<style id="headCss"><?= $page->headCss ?></style>
		<style id="pageCss"><?= $page->css ?></style>
		

		<?= $core->web['scripts']['header'] ?? '' ?>

	
		  <!-- Подключете Masonry.js -->
		  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js"></script> -->

	</head>

	<!-- CSS FOR CURRENT PAGE GENERATOR FROM ALPINE -->

		<!-- INIT BODY FUNCTION. CONNECTED WITH ALPINE X_DATA  -->

		<body :class="{ 'dark': data.darkMode, 'overflow-hidden': data.modalOpen }"  x-data="dataset" @update.window="updatedata($event.detail)" id="body" x-init2="$watch('data', value => console.log(value))" style="background-color:black; color:white;" >


			<!-- NOTIFICATION CONTAINER. ALPINE ADD MESSAGES FROM CORE  -->
			<div id="notification" @notice.window="add($event.detail)" x-data="notification"  >
				<template x-for="notice of notices" :key="notice.id">
					<div
					x-show="visible.includes(notice)"
					x-transition:enter="transition ease-in duration-400"
					x-transition:enter-start="transform opacity-0 translate-x-full"
					x-transition:enter-end="transform opacity-100"
					x-transition:leave="transition ease-out duration-500"
					x-transition:leave-start="transform translate-x-0 opacity-100"
					x-transition:leave-end="transform translate-x-full opacity-0"§
					@click="remove(notice.id)"
					class="notice  "  :class="notice.type == 'error' ? 'bg-red-600 hover:bg-red-500' : 'bg-sky-900 hover:bg-sky-800'"
					x-text="notice.text">
				</div>
			</template>
		</div>

		

<?php if($user->logged_in && $user->is_superAdmin()) { ?>

	<div style="width:100px;height: 50px;position: fixed;right: 100px;bottom: 60px;background-color: red;z-index: 1000;display: flex;justify-content: center;align-items: center;border-radius: 25px;color: white;font-weight: bold;letter-spacing: 1.2px;font-size: 18px;cursor: pointer;" id="dev_save">Save</div>

	<?php } ?>

	<div style="display: none;" id="tailwindCss"></div>
	<script src="/assets/plugins/tailwindcss.3.3.1.js"></script>
	<script>
		  tailwind.config = {
		    darkMode: 'class',

		  }
	</script>




	<div id="header" class="headerFooterCss" style="<?php if($page->slug == 'checkout' || $page->slug == 'checkout2') echo "display:none"; ?>">
		<?php echo  Page::html_res_change($page->header, '10x10'); ?>
	</div>
