<?php
/**
 * Accordion block template.
 *
 * @var string  | null $title Title.
 * @var bool    | null $firstItemExpanded First item expanded.
 * @var array   | null $items Items.
 */

?>

<div class="accordion">
    <?php if ( ! empty( $title ) ) : ?>
        <h2 class="accordion-title">
            <?php echo $title; ?>
        </h2>
    <?php endif; ?>


    <?php if ( ! empty( $items ) ) : ?>
        <div class="accordion-items">
            <?php foreach ( $items as $key => $item ) :
                $iterator = $key + 1;
                    ?>
                    <div class="accordion-item <?php echo ( $iterator === 1 ) && $firstItemExpanded ? 'active' : ''; ?>">
                        <div class="accordion-item-title">
                            <h4><?php echo $item['heading']; ?></h4>
                            <span class="accordion-item-icon"></span>
                        </div>
                        <div class="accordion-item-content">
                            <div class="accordion-item-inner">
                                <div class="column column-left">
                                    <p><?php echo $item['content']; ?></p>
                                </div>
                                <div class="column column-right">
                                    <div class="content-image">
                                        <img class="lazy" src="<?php echo $item['image']; ?>"
                                             data-src="<?php echo $item['image']; ?>">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>
