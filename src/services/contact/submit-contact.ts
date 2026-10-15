export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  product?: string;
  message: string;
  kvkk?: boolean;
};

/**
 * TODO: Connect to email / CRM backend.
 * Until then this function returns not-configured so the UI does not fake success.
 */
export async function submitContact(
  _payload: ContactPayload,
): Promise<{ ok: false; reason: "not-configured" }> {
  void _payload;
  return { ok: false, reason: "not-configured" };
}
