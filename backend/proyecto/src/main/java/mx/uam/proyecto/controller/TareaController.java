package mx.uam.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import mx.uam.proyecto.model.dto.TareaDTO;
import mx.uam.proyecto.service.TareaService;




@RestController
@RequestMapping("/tareas")
@Tag(name ="Tarea", description ="Operaciones CRUD para tareas")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping
    @Operation(summary = "Obtener todas las tareas", description = "Retorna una lista de todas las tareas")
    public List<TareaDTO> getAll(){
        return tareaService.findAll();
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener tarea por ID", description = "Retorna una tarea por su ID")
    public ResponseEntity<TareaDTO> getById(@Parameter(description="ID de la tarea") @PathVariable Integer id) {
        TareaDTO dto = tareaService.findById(id);
        if (dto == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @Operation(summary = "Crear tarea", description="Crea una nueva tarea")
    public ResponseEntity<TareaDTO> create(@RequestBody TareaDTO dto) {
        TareaDTO created = tareaService.create(dto);
        if (created == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar tarea", description="Actualiza una tarea existente")
    public ResponseEntity<TareaDTO> update(@Parameter(description="ID de la tarea") @PathVariable Integer id, @RequestBody TareaDTO dto) {
        TareaDTO updated = tareaService.update(id, dto);
        if(updated == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar tarea", description="Elimina una tarea por su ID")
    public ResponseEntity<Void> delete(@Parameter(description="ID de la tarea") @PathVariable Integer id){
        boolean deleted = tareaService.delete(id);
        if(!deleted){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
    
    
}
