<?php
/*
* Plugin Name: GB Custom Accordion block
* Description: Custom Gutenberg plugin with accordion block
* Author: Oleksandr Kartashev oleksandrkartashev@gmail.com
* Author URI: https://github.com/maxwell111/
* Version: 1.0.0
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function accordion_block_register() {
    // Editor script
    wp_register_script(
        'accordion-editor-js',
        plugins_url( 'dist/js/editor.min.js', __FILE__ ),
        array( 'wp-blocks', 'wp-components', 'wp-block-editor' ),
    );

    // Editor styles
    wp_register_style(
        'accordion-editor-css',
        plugins_url( 'dist/css/editor.min.css', __FILE__ ),
        [],
    );

    // Frontend styles
    wp_register_style(
        'accordion-frontend-css',
        plugins_url( 'dist/css/script.min.css', __FILE__ ),
        [],
    );

    // Frontend scripts
    wp_register_script(
        'accordion-frontend-js',
        plugins_url( 'dist/js/script.min.js', __FILE__ ),
        [],
    );

    register_block_type( 'gb-custom-accordion-plugin/gb-custom-accordion-block', array(
        'attributes'      => [
            'title' => [
                'type'    => 'string',
                'default' => "",
            ],
            'firstItemExpanded'        => [
                'type'    => 'boolean',
                'default' => true,
            ],
            'items'        => [
                'type'    => 'array',
                'default' => [],
            ],
        ],
        'render_callback' => function($attributes, $content) {
            
            $title = $attributes['title'] ?? null;
            $firstItemExpanded = $attributes['firstItemExpanded'] ?? null;
            $items = $attributes['items'] ?? null;
        
            ob_start();
            require_once( 'src/templates/accordion-block.php');
            return ob_get_clean();
        
        },
        'editor_script' => 'accordion-editor-js',
        'editor_style' => 'accordion-editor-css',
        'view_script' => 'accordion-frontend-js',
        'style' => 'accordion-frontend-css',        
    ));
}

add_action('init', 'accordion_block_register');
