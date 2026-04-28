export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const maxFileSize = 1024 * 1024;

  if (!file || typeof file.text !== "function") {
    return Response.json({ error: "No file was uploaded." }, { status: 400 });
  }

  if (file.size > maxFileSize) {
    return Response.json(
      { error: "Please import a file smaller than 1 MB." },
      { status: 413 }
    );
  }

  const text = await file.text();

  return Response.json({
    name: file.name,
    size: file.size,
    type: file.type,
    text,
  });
}
