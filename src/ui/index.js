import Vue from "vue";
import Button from "./button";
// import Avatar from "./avatar";
import Toggle from "./toggle";
import Card from "./card";
import CardToggle from "./card/toggle";
import FormSection from "./form/section";
import FormField from "./form/field";
import FormFieldLabel from "./form/fieldLabel";
import Pagination from "./pagination";
import * as filters from "./utils/filters";

Vue.component("Button", Button);
// Vue.component("Avatar", Avatar);
Vue.component("Toggle", Toggle);
Vue.component("Card", Card);
Vue.component("CardToggle", CardToggle);
Vue.component("FormSection", FormSection);
Vue.component("FormField", FormField);
Vue.component("FormFieldLabel", FormFieldLabel);
Vue.component("Pagination", Pagination);

Vue.filter("labelAddress", filters.labelAddress);
Vue.filter("urlChainExplorer", filters.urlChainExplorer);
Vue.filter("urlIpfsExplorer", filters.urlIpfsExplorer);
