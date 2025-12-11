package mx.uam.proyecto.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.uam.proyecto.model.dto.TareaDTO;
import mx.uam.proyecto.model.entity.Proyecto;
import mx.uam.proyecto.model.entity.Tarea;
import mx.uam.proyecto.repository.ProyectoRepository;
import mx.uam.proyecto.repository.TareaRepository;

@Service
public class TareaService {
    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<TareaDTO> findAll(){
        return tareaRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public TareaDTO findById(Integer id){
        if (id == null){
            return null;
        }
        Optional<Tarea> tarea = tareaRepository.findById(id);
        return tarea.map(this::toDTO).orElse(null);
    }

    public TareaDTO create(TareaDTO dto){
        if (dto == null || dto.getProyectoId() == null){
            return null;
        }
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(dto.getProyectoId());
        if (!proyectoOpt.isPresent()){
            return null;
        }
        Tarea tarea = new Tarea();
        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        tarea.setEstado(dto.getEstado());
        tarea.setFecha(dto.getFecha());
        tarea.setProyecto(proyectoOpt.get());
        Tarea saved = tareaRepository.save(tarea);
        return toDTO(saved);
    }

    public TareaDTO update(Integer id, TareaDTO dto){
        if (id == null || dto == null || dto.getProyectoId() == null){
            return null;
        }
        Optional<Tarea> tareaOpt = tareaRepository.findById(id);
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(dto.getProyectoId());
        if(!tareaOpt.isPresent() || !proyectoOpt.isPresent()){
            return null;
        }
        Tarea tarea = tareaOpt.get();
        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        tarea.setEstado(dto.getEstado());
        tarea.setFecha(dto.getFecha());
        tarea.setProyecto(proyectoOpt.get());
        Tarea updated = tareaRepository.save(tarea);
        return toDTO(updated);
    }

    public boolean delete(Integer id){
        if (id == null || !tareaRepository.existsById(id)){
            return false;
        }
        tareaRepository.deleteById(id);
        return true;
    }
    
    private TareaDTO toDTO(Tarea tarea){
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
