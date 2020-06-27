<!--
* @name               main
* @namespace          layouts
* @type               blade
*
* Main layout that handle things like scripts import, stylesheets import, etc...
*
* @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->
<?php
$settings = json_decode($settings);
$package = json_decode($package);
?>
<html>
    <head>
        <title>{{ $title }}</title>
        @if ($settings->assets && $settings->assets->css)
          @foreach ($settings->assets->css as $asset)
            @if (!$asset->body)
              <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
            @endif
          @endforeach
        @endif
        @if ($settings->assets && $settings->assets->js)
          @foreach ($settings->assets->js as $asset)
             @if (!$asset->body)
              <script type="text/javascript" id="{{ $asset->name }}" src="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
            @endif
          @endforeach
        @endif
    </head>
    <body>

      <header class="ck-header">
        <span class="ck-header__logo"></span>
        <h1 class="ck-header__title">{{ $package->name }}</h1>
      </header>

      @section('sidebar')
      @show
      <div class="container">
        @yield('content')
      </div>

      @if ($settings->assets && $settings->assets->css)
        @foreach ($settings->assets->css as $asset)
          @if ($asset->body)
            <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
          @endif
        @endforeach
      @endif
      @if ($settings->assets && $settings->assets->js)
        @foreach ($settings->assets->js as $asset)
          @if ($asset->body)
            <script type="text/javascript" id="{{ $asset->name }}" src="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
          @endif
        @endforeach
      @endif
    </body>
</html>