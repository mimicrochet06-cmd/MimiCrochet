import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  // Puedes agregar lógica para redirecciones o seguridad aquí si quieres
  return NextResponse.next();
}
