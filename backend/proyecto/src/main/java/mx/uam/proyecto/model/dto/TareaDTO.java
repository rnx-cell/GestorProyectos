package mx.uam.proyecto.model.dto;

import java.util.Date;

import mx.uam.proyecto.model.entity.TareaEstado;

public class TareaDTO {

    private Integer id;
    private String titulo;
    private String descripcion;
    private TareaEstado estado;
    private Date fecha;
    private Integer proyectoId;

    //getters y setters:
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public TareaEstado getEstado() {
        return estado;
    }
    public void setEstado(TareaEstado estado) {
        this.estado = estado;
    }
    public Date getFecha() {
        return fecha;
    }
    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
    public Integer getProyectoId() {
        return proyectoId;
    }
    public void setProyectoId(Integer proyectoId) {
        this.proyectoId = proyectoId;
    }

    
}
