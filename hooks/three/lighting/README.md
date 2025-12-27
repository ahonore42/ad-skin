## 📍 **Position Coordinates Explained with Sphere Geometry**

### **`directionalLight.position.set(1, 1, 0)`**
Sets the light's position **relative to the camera** (since the light is a child of the camera):

- **`1`** (X-axis) = **1 unit to the right** of the camera
- **`1`** (Y-axis) = **1 unit above** the camera  
- **`0`** (Z-axis) = **Same depth** as the camera (no forward/backward offset)

So the light is positioned slightly **up and to the right** of where the camera is looking.

### **`directionalLight.target.position.set(0, 0, 0)`**
Sets where the light is **pointing to** in **world space**:

- **`(0, 0, 0)`** = The **world origin** (center of the scene)
- This is where the sphere is located
- So the light always points at the sphere's center

## 🎯 **Visual Representation**

```
    Camera/Viewer
         👁️
        ╱ ┆
    💡 ╱   ┆  (Light at 1,1,0 relative to camera)
      ╱    ┆
     ╱     ┆
    ╱      ▼
   ╱       🌐  (Sphere at 0,0,0 - light target)
```

## 🔧 **What This Creates**
- Light comes from **upper-right** relative to the view
- Always points at the sphere center
- As you orbit around (if you had orbit controls), the light moves with the viewpoint
- The sphere always appears lit from the same screen direction

## ⚙️ **Adjusting the Values**
Values could be changed to:
- `(0, 2, 0)` = Light directly above camera
- `(-1, 1, 1)` = Light up-left-forward of camera  
- `(0, 0, 1)` = Light directly in front of camera (like a flashlight)

The target `(0, 0, 0)` usually stays the same since that's where the sphere is positioned.