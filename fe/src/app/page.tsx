'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.scss';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

interface FormData {
  name: string;
  email: string;
  age: string;
  city: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    city: ''
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Kullanıcıları getir
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        showAlert('error', 'Kullanıcılar yüklenemedi');
      }
    } catch (error) {
      showAlert('error', 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Alert göster
  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.age || !formData.city) {
      showAlert('error', 'Tüm alanları doldurun');
      return;
    }

    try {
      const url = '/api/users';
      const method = editingUser ? 'PUT' : 'POST';
      const body = editingUser 
        ? { ...formData, id: editingUser.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        showAlert('success', result.message || (editingUser ? 'Kullanıcı güncellendi' : 'Kullanıcı eklendi'));
        setShowModal(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', age: '', city: '' });
        fetchUsers();
      } else {
        showAlert('error', result.error || 'İşlem başarısız');
      }
    } catch (error) {
      showAlert('error', 'Bir hata oluştu');
    }
  };

  // Kullanıcı sil
  const handleDelete = async (id: number) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        showAlert('success', 'Kullanıcı silindi');
        fetchUsers();
      } else {
        showAlert('error', result.error || 'Silme işlemi başarısız');
      }
    } catch (error) {
      showAlert('error', 'Bir hata oluştu');
    }
  };

  // Düzenleme modalını aç
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age.toString(),
      city: user.city
    });
    setShowModal(true);
  };

  // Modal kapat
  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', age: '', city: '' });
  };

  // Sayfa yüklendiğinde kullanıcıları getir
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className={styles.header}>
        <h1>Kullanıcı Yönetimi</h1>
        <button 
          className="btn primary"
          onClick={() => setShowModal(true)}
        >
          ➕ Yeni Kullanıcı Ekle
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Soyad</th>
                <th>E-posta</th>
                <th>Yaş</th>
                <th>Şehir</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                    Henüz kullanıcı bulunmuyor
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className="btn primary"
                          onClick={() => handleEdit(user)}
                        >
                          ✏️ Düzenle
                        </button>
                        <button
                          className="btn danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          🗑️ Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}</h2>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ad Soyad</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ad Soyad giriniz"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="E-posta giriniz"
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Yaş</label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Yaş giriniz"
                  min="1"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Şehir</label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Şehir giriniz"
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn secondary" onClick={closeModal}>
                  İptal
                </button>
                <button type="submit" className="btn success">
                  {editingUser ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
