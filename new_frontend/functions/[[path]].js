import { render } from "../dist/server/worker-entry-BAeIdAfL.js"; 
// Note: If that hashed string filename changes on your next build, 
// we will point it to index.js or let TanStack generate a clean entry point.

export async function onRequest(context) {
  return render(context.request, context.env);
}
