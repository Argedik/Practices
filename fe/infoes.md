src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # ✅ SRP - Sadece buton sorumluluğu
│   │   ├── Alert.tsx           # ✅ SRP - Sadece alert gösterme
│   │   └── Loading.tsx         # ✅ SRP - Sadece loading gösterme
│   ├── layout/
│   │   ├── UserTable.tsx       # ✅ SRP - Sadece tablo sorumluluğu
│   │   ├── UserTable.module.scss
│   │   ├── UserManagement.tsx  # ✅ OCP - Ana container
│   │   └── UserManagement.module.scss
│   ├── forms/
│   │   ├── UserForm.tsx        # ✅ SRP - Sadece form sorumluluğu
│   │   └── UserForm.module.scss
│   └── index.ts               # ✅ ISP - Merkezi export
├── hooks/
│   └── useUsers.ts            # ✅ SRP - Sadece user logic'i
├── services/
│   └── api.ts                 # ✅ DIP - API abstraction
├── types/
│   └── index.ts               # ✅ SRP - Sadece type tanımları
└── app/
    └── page.tsx               # ✅ Artık sadece 5 satır!