<!-- <script lang="ts"> -->
<!-- import type { IContactFormBlock } from "@payload-types"; -->
<!-- import { Checkbox } from "@/components/ui/checkbox"; -->
<!-- import * as Form from "@/components/ui/form"; -->
<!-- import { Input } from "@/components/ui/input"; -->
<!-- import * as Select from "@/components/ui/select"; -->
<!-- import { Textarea } from "@/components/ui/textarea"; -->
<!-- import { defaults, superForm } from "sveltekit-superforms"; -->
<!-- import { zodClient } from "sveltekit-superforms/adapters"; -->
<!-- import { zod } from "sveltekit-superforms/adapters"; -->
<!-- // import { PUBLIC_PAYLOAD_BACKEND_URL } from '$env/static/public'; -->
<!-- import { devCMS } from "@/site-config"; -->
<!-- import { z } from "zod"; -->
<!-- import { Toaster } from "@/components/ui/sonner"; -->
<!-- import { toast } from "svelte-sonner"; -->
<!-- import { goto } from "$app/navigation"; -->
<!---->
<!-- const { blockData }: { blockData: IContactFormBlock } = $props(); -->
<!-- const { form: formOrNumber } = blockData; -->
<!---->
<!-- // temporary fix beloow, shouldnt ever nest form too deep, otherwise must some kinda get from number function, -->
<!-- // maybe using payload local api -->
<!-- // will need to fix all types at some points -->
<!-- const formObject = -->
<!--   typeof formOrNumber === "number" ? ({} as any) : formOrNumber; -->
<!---->
<!-- let acc: { [x: string]: any } = {}; -->
<!---->
<!-- for (const cur of formObject.fields) { -->
<!--   if (!cur.name) continue; //messaage  has no name -->
<!---->
<!--   switch (cur.blockType) { -->
<!--     case "number": -->
<!--       acc[cur.name] = z -->
<!--         .string() -->
<!--         .min(cur.required ? 1 : 0, { -->
<!--           message: `This field cannot be left empty`, -->
<!--         }) -->
<!--         .default(cur.defaultValue ? cur.defaultValue : "") -->
<!--         .refine((val) => !isNaN(Number(val)), { message: "Invalid Number" }); -->
<!--       break; -->
<!--     case "checkbox": -->
<!--       acc[cur.name] = z -->
<!--         .boolean() -->
<!--         .default(cur.defaultValue ? cur.defaultValue : false); -->
<!--       break; -->
<!--     default: -->
<!--       acc[cur.name] = z -->
<!--         .string() -->
<!--         .min(cur.required ? 1 : 0, { -->
<!--           message: `This field cannot be left empty`, -->
<!--         }) -->
<!--         .default(cur.defaultValue ? cur.defaultValue : ""); -->
<!--       break; -->
<!--   } -->
<!-- } -->
<!---->
<!-- const schema = z.object(acc); -->
<!-- const initForm = defaults(zod(schema)); -->
<!---->
<!-- const form = superForm(initForm, { -->
<!--   validators: zodClient(schema), -->
<!--   resetForm: false, -->
<!--   SPA: true, -->
<!--   async onUpdate({ form, cancel }) { -->
<!--     if (!form.valid) { -->
<!--       Object.entries(form.errors).map(([k, v]) => ($errors[`${k}`] = v)); -->
<!--       cancel(); -->
<!--       return; -->
<!--     } -->
<!--     let submissionData = Object.entries(form.data).map(([name, value]) => ({ -->
<!--       field: name, -->
<!--       value, -->
<!--     })); -->
<!--     const submissionResponse = await fetch(`${devCMS}/api/form-submissions`, { -->
<!--       method: "POST", -->
<!--       headers: { -->
<!--         "Content-Type": "application/json", -->
<!--       }, -->
<!--       body: JSON.stringify({ -->
<!--         form: formObject.id, -->
<!--         submissionData, -->
<!--       }), -->
<!--     }); -->
<!--     if (!submissionResponse.ok) { -->
<!--       toast.error( -->
<!--         "Submission Failed. Please try again or contact us directly.", -->
<!--       ); -->
<!--       return; -->
<!--     } -->
<!--     if (formObject.confirmationType == "redirect") { -->
<!--       goto(formObject.redirect); -->
<!--       return; -->
<!--     } -->
<!--     toast.success( -->
<!--       // formObject.confirmationMessage ?? 'Thank you for contacting us. We will be in touch shortly' -->
<!--       "Thank you for contacting us. We will be in touch shortly", -->
<!--     ); -->
<!--   }, -->
<!-- }); -->
<!-- // dataType: 'json', -->
<!-- const { form: formData, enhance, errors } = form; -->
<!-- </script> -->
<!---->
<!-- <Toaster position="top-right" richColors closeButton /> -->
<!---->
<!-- <div class="container mx-auto flex items-center justify-center"> -->
<!--   <form use:enhance method="POST" class="flex w-full md:w-2/3 flex-wrap"> -->
<!--     {#each formObject.fields as field} -->
<!--       <div -->
<!--         class="px-2 " -->
<!--         style={`flex-basis: calc(${field.width ? field.width : 100}%);`} -->
<!--       > -->
<!--         <Form.Field form={form} name={`${field.name}`}> -->
<!--           <Form.Control> -->
<!--             {#snippet children({ props }: { props: any })} -->
<!--               {@render buildForm(props, field)} -->
<!--             {/snippet} -->
<!--           </Form.Control> -->
<!--           {#if !field.description} -->
<!--             <Form.Description>{field.description}</Form.Description> -->
<!--           {/if} -->
<!--           <Form.FieldErrors class="text-xs" /> -->
<!--         </Form.Field> -->
<!--       </div> -->
<!--     {/each} -->
<!--     <div class="w-full px-2 py-5"> -->
<!--       <Form.Button class=""> -->
<!--         {formObject.submitButtonLabel ?? 'Submit'}</Form.Button -->
<!--       > -->
<!--     </div> -->
<!--   </form> -->
<!-- </div> -->
<!---->
<!-- {#snippet buildForm(props: any, field: any)} -->
<!--   {#if field.blockType == 'text'} -->
<!--     <Form.Label> -->
<!--       {field.label} -->
<!--       {#if field.required} -->
<!--         <sup class="text-destructive inline">*</sup> -->
<!--       {/if} -->
<!--     </Form.Label> -->
<!--     <Input -->
<!--       class="" -->
<!--       {...props} -->
<!--       bind:value={$formData[field.name as keyof z.infer<typeof schema>]} -->
<!--     /> -->
<!--   {:else if field.blockType == 'textarea'} -->
<!--     <Form.Label> -->
<!--       {field.label} -->
<!--       {#if field.required} -->
<!--         <sup class="text-destructive inline">*</sup> -->
<!--       {/if} -->
<!--     </Form.Label> -->
<!--     <Textarea -->
<!--       class="resize-none" -->
<!--       {...props} -->
<!--       bind:value={$formData[field.name as keyof z.infer<typeof schema>]} -->
<!--     /> -->
<!--   {:else if field.blockType == 'select'} -->
<!--     <Form.Label> -->
<!--       {field.label} -->
<!--       {#if field.required} -->
<!--         <sup class="text-destructive inline">*</sup> -->
<!--       {/if} -->
<!--     </Form.Label> -->
<!--     <Select.Root -->
<!--       type="single" -->
<!--       name={field.name} -->
<!--       bind:value={$formData[field.name as keyof z.infer<typeof schema>]} -->
<!--     > -->
<!--       <Select.Trigger {...props} class=""> -->
<!--         {$formData.select ?? field.label} -->
<!--       </Select.Trigger> -->
<!--       <Select.Content> -->
<!--         <Select.Group> -->
<!--           {#each field.options as opts} -->
<!--             <Select.Item value={opts.value} label={opts.label} -->
<!--               >{opts.label}</Select.Item -->
<!--             > -->
<!--           {/each} -->
<!--         </Select.Group> -->
<!--       </Select.Content> -->
<!--     </Select.Root> -->
<!--   {:else if field.blockType == 'email'} -->
<!--     <Form.Label> -->
<!--       {field.label} -->
<!--       {#if field.required} -->
<!--         <sup class="text-destructive inline">*</sup> -->
<!--       {/if} -->
<!--     </Form.Label> -->
<!--     <Input -->
<!--       class="" -->
<!--       {...props} -->
<!--       type="email" -->
<!--       bind:value={$formData[field.name as keyof z.infer<typeof schema>]} -->
<!--     /> -->
<!--   {:else if field.blockType == 'checkbox'} -->
<!--     <Form.Label> -->
<!--       {field.label} -->
<!--       {#if field.required} -->
<!--         <sup class="text-destructive inline">*</sup> -->
<!--       {/if} -->
<!--     </Form.Label> -->
<!--     <Checkbox {...props} bind:checked={$formData[field.name]} /> -->
<!--   {:else if field.blockType == 'number'} -->
<!--     <Form.Label> -->
<!--       {field.label} -->
<!--       {#if field.required} -->
<!--         <sup class="text-destructive inline">*</sup> -->
<!--       {/if} -->
<!--     </Form.Label> -->
<!--     <Input -->
<!--       {...props} -->
<!--       type="text" -->
<!--       inputmode="numeric" -->
<!--       pattern="[0-9]*" -->
<!--       bind:value={$formData[field.name as keyof z.infer<typeof schema>]} -->
<!--       placeholder="" -->
<!--     /> -->
<!-- {:else if field.blockType=='message'} -->
<!--   {@html fields} -->
<!-- {:else if field.blockType=='payment'} -->
<!-- {:else if field.blockType=='state'} -->
<!-- {:else if field.blockType=='country'} -->
<!--   {/if} -->
<!-- {/snippet} -->
