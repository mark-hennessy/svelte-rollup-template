<script>
  import { Accordion, AccordionItem } from 'carbon-components-svelte';
  import { sayHi } from '~/utils/stringUtils';

  sayHi();
</script>

<Accordion>
  <AccordionItem open title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
  <AccordionItem title="Section 3">Content 3</AccordionItem>
</Accordion>

<style>
</style>
