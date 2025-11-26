'use client';

import { useState, useEffect } from 'react';
import {
  Edit,
  Trash2,
  Loader2,
  X,
  CheckCircle,
  AlertTriangle,
  Plus,
  Upload,
  Camera,
} from 'lucide-react';

interface Categoria {
  id: string;
  name: string;
  slug: string;
}

interface Producto {
  id: string;
  name: string;
  description?: string;
  price: number;
  colors: string[];
  images: string[];
  categoryId: string;
  isNew: boolean;
}

export default function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    colors: '',
    categoryId: '',
    image: '',
    isNew: false,
  });

  const [previsualizacion, setPrevisualizacion] = useState<string | null>(null);

  // ✅ Toast
  const mostrarToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 🧾 Cargar productos y categorías
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargar productos
      const resProductos = await fetch('/api/productos');
      const dataProductos = await resProductos.json();
      if (dataProductos.success) setProductos(dataProductos.data);

      // Cargar categorías
      const resCategorias = await fetch('/api/categorias');
      const dataCategorias = await resCategorias.json();
      if (dataCategorias.success && dataCategorias.data) {
        setCategorias(dataCategorias.data);
        if (dataCategorias.data.length > 0) {
          setForm(prev => ({ ...prev, categoryId: dataCategorias.data[0].id }));
        }
      }
    } catch (error) {
      console.error('Error al cargar datos', error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Eliminar
  const eliminarProducto = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      const res = await fetch(`/api/productos/by-id/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProductos(prev => prev.filter(p => p.id !== id));
        mostrarToast('Producto eliminado correctamente', 'success');
      } else {
        mostrarToast('Error al eliminar el producto', 'error');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      mostrarToast('Error de conexión al eliminar', 'error');
    }
  };

  // ✏️ Editar
  const abrirEdicion = (producto: Producto) => {
    setModoCreacion(false);
    setEditando(producto);
    setForm({
      name: producto.name,
      description: producto.description || '',
      price: producto.price.toString(),
      colors: producto.colors.join(', '),
      categoryId: producto.categoryId,
      image: producto.images[0] || '',
      isNew: producto.isNew || false,
    });
    setPrevisualizacion(producto.images[0] || null);
  };

  // ➕ Crear nuevo
  const abrirCreacion = () => {
    setModoCreacion(true);
    setEditando(null);
    setForm({
      name: '',
      description: '',
      price: '',
      colors: '',
      categoryId: categorias.length > 0 ? categorias[0].id : '',
      image: '',
      isNew: true, // Por defecto, nuevos productos se marcan como "nuevo"
    });
    setPrevisualizacion(null);
  };

  // ☁️ Subir imagen a Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubiendo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mimicrochet');

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error('Cloudinary no configurado');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (!data.secure_url) throw new Error(data.error?.message || 'Error al subir');

      setForm(prev => ({ ...prev, image: data.secure_url }));
      setPrevisualizacion(data.secure_url);
      mostrarToast('Imagen subida correctamente', 'success');
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      mostrarToast('Error al subir la imagen', 'error');
    } finally {
      setSubiendo(false);
    }
  };

  // 💾 Guardar o actualizar
  // 💾 Guardar o actualizar (REEMPLAZA tu función guardarCambios)
const guardarCambios = async () => {
  if (!form.name || !form.price || !form.categoryId || !form.image) {
    mostrarToast('¡Por favor completa todos los campos obligatorios!', 'error');
    return;
  }

  setGuardando(true);
  try {
    const method = editando ? 'PUT' : 'POST';
    const url = editando ? `/api/productos/by-id/${editando.id}` : '/api/productos';

    // ✅ YA NO GENERAMOS EL SLUG AQUÍ - La API lo hace automáticamente
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: form.description || 'Producto artesanal hecho a mano con amor',
        price: parseFloat(form.price),
        colors: form.colors ? form.colors.split(',').map(c => c.trim()) : [],
        images: [form.image],
        categoryId: form.categoryId,
        available: true,
        customizable: true,
        isNew: form.isNew,
      }),
    });

    const data = await res.json();
    
    if (data.success) {
      cargarDatos();
      setEditando(null);
      setModoCreacion(false);
      setPrevisualizacion(null);
      mostrarToast(editando ? 'Cambios guardados' : 'Producto creado', 'success');
    } else {
      // Mostrar el error específico que viene del servidor
      mostrarToast(data.error || 'Error al guardar', 'error');
    }
  } catch (error) {
    console.error('Error al guardar producto:', error);
    mostrarToast('Error de conexión al guardar', 'error');
  } finally {
    setGuardando(false);
  }
};

  // 🌀 Cargando
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900">✨ MimiCrochet - Productos</h1>
        <button
          onClick={abrirCreacion}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-transform"
        >
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      {/* 🧱 Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform relative"
          >
            {/* Etiqueta NUEVO */}
            {p.isNew && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                ✨ NUEVO
              </div>
            )}
            
            <div className="relative w-full h-56">
              <img
                src={p.images[0] || '/placeholder.jpg'}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-purple-800 mb-1">{p.name}</h2>
              <p className="text-pink-600 font-semibold mb-2">
                ${p.price.toLocaleString('es-CO')} COP
              </p>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                {p.description || 'Sin descripción'}
              </p>
              <p className="text-gray-500 text-sm mb-4">🎨 {p.colors.join(', ')}</p>
              <div className="mt-auto flex justify-between gap-2">
                <button
                  onClick={() => abrirEdicion(p)}
                  className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 flex items-center justify-center gap-2 font-semibold"
                >
                  <Edit className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => eliminarProducto(p.id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 flex items-center justify-center gap-2 font-semibold"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🧾 Panel lateral - FORMULARIO COMPLETO */}
      {(editando || modoCreacion) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={() => {
          setEditando(null);
          setModoCreacion(false);
          setPrevisualizacion(null);
        }}>
          <div
            className={`w-full max-w-md lg:max-w-2xl max-h-[95vh] bg-white rounded-3xl shadow-2xl p-6 lg:p-8 z-50 overflow-y-auto transition-all duration-300 ${
              editando || modoCreacion ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setEditando(null);
                setModoCreacion(false);
                setPrevisualizacion(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-800 mb-6 mt-8 text-center">
              {modoCreacion ? '✨ Nuevo Producto' : '✏️ Editar Producto'}
            </h2>

            <div className="space-y-5">
              {/* 📸 Foto del Producto */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📸 Foto del Producto *
                </label>
                {!previsualizacion ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-3 border-dashed border-purple-300 rounded-2xl cursor-pointer hover:bg-purple-50 transition-all">
                    <Camera className="w-10 h-10 text-purple-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">
                      Toca para subir foto
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={subiendo}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={previsualizacion}
                      alt="Vista previa"
                      className="w-full h-52 object-cover rounded-2xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setForm(prev => ({ ...prev, image: '' }));
                        setPrevisualizacion(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg hover:bg-red-600"
                    >
                      Cambiar
                    </button>
                  </div>
                )}
                {subiendo && (
                  <div className="text-center text-purple-600 font-semibold mt-2 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subiendo imagen...
                  </div>
                )}
              </div>

              {/* 📂 Categoría */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📂 Categoría *
                </label>
                <select
                  value={form.categoryId}
                  onChange={e => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
                >
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🎨 Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎨 Nombre *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Mochila Wayuu Grande"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
                />
              </div>

              {/* ✍️ Descripción */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ✍️ Descripción
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Tamaño, detalles especiales..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-base resize-none"
                />
              </div>

              {/* 🎨 Colores */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎨 Colores
                </label>
                <input
                  type="text"
                  value={form.colors}
                  onChange={e => setForm({ ...form, colors: e.target.value })}
                  placeholder="Azul, Amarillo, Rojo"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Separados por comas</p>
              </div>

              {/* 💰 Precio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="80000"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg font-semibold"
                  />
                </div>
              </div>

              {/* ✨ Marcar como Nuevo */}
              <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={e => setForm({ ...form, isNew: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-700 block">
                      ✨ Marcar como producto nuevo
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Se mostrará con una etiqueta especial en la página principal
                    </p>
                  </div>
                </label>
              </div>

              {/* 💾 Botón Guardar */}
              <button
                onClick={guardarCambios}
                disabled={guardando || subiendo}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform ${
                  guardando || subiendo
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95'
                }`}
              >
                {guardando ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Guardando...
                  </span>
                ) : subiendo ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Subiendo imagen...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload className="w-6 h-6" />
                    {modoCreacion ? 'Publicar Producto' : 'Guardar Cambios'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧈 Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-lg text-white flex items-center gap-3 transition-all ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <AlertTriangle className="w-6 h-6" />
          )}
          <p className="font-semibold">{toast.message}</p>
        </div>
      )}
    </div>
  );
}