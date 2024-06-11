
<div id="main" class="is-wrapper  w-full h-full justify-center bg-black"  >
  <?php echo  Page::html_res_change($page->html, '10x10'); ?>
  <?php echo  '<div x-init="callBackMain()"></div>' ?>
  <?php echo  '<div x-init="console.log(\'init\');"></div>' ?>
</div>
