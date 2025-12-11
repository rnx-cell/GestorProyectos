package mx.uam.proyecto.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.uam.proyecto.model.dto.ProyectoDTO;
import mx.uam.proyecto.model.dto.TareaDTO;
import mx.uam.proyecto.model.entity.Proyecto;
import mx.uam.proyecto.model.entity.Tarea;
import mx.uam.proyecto.repository.ProyectoRepository;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<ProyectoDTO> findAll(){
        return proyectoRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public ProyectoDTO findById(Integer id){
        if (id == null){
            return null;
        }
        Optional<Proyecto> proyecto = proyectoRepository.findById(id);
        return proyecto.map(this::toDTO).orElse(null);
    }

    public ProyectoDTO create(ProyectoDTO dto){
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(dto.getNombre());
        proyecto.setDescripcion(dto.getDescripcion());
        Proyecto saved = proyectoRepository.save(proyecto);
        return toDTO(saved);
    }

    public ProyectoDTO update(Integer id, ProyectoDTO dto){
        if (id == null || dto == null){
            return null;
        }
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(id);
        if (!proyectoOpt.isPresent()){
            return null;
        }
        Proyecto proyecto = proyectoOpt.get();
        proyecto.setNombre(dto.getNombre());
        proyecto.setDescripcion(dto.getDescripcion());
        Proyecto updated = proyectoRepository.save(proyecto);
        return toDTO(updated);
    }

    public boolean delete(Integer id){
        if (id == null || !proyectoRepository.existsById(id)){
            return false;
        }
        proyectoRepository.deleteById(id);
        return true;
    }

    private ProyectoDTO toDTO(Proyecto proyecto){
        ProyectoDTO dto = new ProyectoDTO();
        dto.setId(proyecto.getId());
        dto.setNombre(proyecto.getNombre());
        dto.setDescripcion(proyecto.getDescripcion());
        if (proyecto.getTareas() != null) {
            List<TareaDTO> tareasDTO = proyecto.getTareas()
                .stream()
                .map(this::toTareaDTO)   // usamos un método auxiliar
                .collect(Collectors.toList());
            dto.setTareas(tareasDTO);
        }
        return dto;
    }

    private TareaDTO toTareaDTO(Tarea tarea){
        TareaDTO dto = new TareaDTO();
        dto.setId(tarea.getId());
        dto.setTitulo(tarea.getTitulo());
        dto.setDescripcion(tarea.getDescripcion());
        dto.setFecha(tarea.getFecha());
        dto.setEstado(tarea.getEstado());
        dto.setProyectoId(tarea.getProyecto() != null ? tarea.getProyecto().getId() : null);
        return dto;
    }
}
