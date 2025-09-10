import CalistoLanding from "./hero/calisto-landing.svelte";
import MediumHero from "./hero/medium-hero.svelte"

import RichTextBlock from "./rich-text/block.svelte";

import Image from "./common/image.svelte"
import Gutter from "./common/gutter.svelte"

import CalistoFeatureCard from "./cards/calisto-feature-card.svelte"
import DiscountCard from "./cards/discount-card.svelte"
import SingleCard from "./cards/single-card.svelte"
import HoverCard from "./cards/hover-card.svelte"

import BlockColumnLayout from "./layout/block-column-layout.svelte"
import ContentColLayout from "./layout/content-col-layout.svelte"

import StickyContainers from "./special/sticky-containers.svelte";
import BentoGrid from "./special/bento-grid.svelte"
import Accordion from "./special/accordion.svelte"
import Carousel from "./special/carousel.svelte"

import RichTextFooter from './navigation/footer/rich-text-footer.svelte'
import ImageHeader from './navigation/header/image-header.svelte'

import ContactForm from "./forms/contact-form.svelte"

export const blockList = new Map();

//hero
blockList.set("calistoLanding", CalistoLanding);
blockList.set("mediumHero", MediumHero)

//special
blockList.set("stickyContainers", StickyContainers);
blockList.set("bentoGrid", BentoGrid);
blockList.set("accordion", Accordion);
blockList.set("carousel", Carousel)

//cards
blockList.set("calistoFeatureCard", CalistoFeatureCard);
blockList.set("discountCard", DiscountCard)
blockList.set("singleCard", SingleCard)
blockList.set("hoverCard", HoverCard)

//layout
blockList.set("blockColumnLayout", BlockColumnLayout);
blockList.set("contentColLayout", ContentColLayout);

//common
blockList.set("image", Image)
blockList.set("rtBlock", RichTextBlock);
blockList.set("gutter", Gutter)

//navigation
blockList.set("imageHeader", ImageHeader)
blockList.set("richTextFooter", RichTextFooter)

blockList.set("contactForm", ContactForm)
