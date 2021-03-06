class StaffsController < ApplicationController
  before_action :authenticate_admin!
	def index
    @staff = Staff.all
  end

  def new
  	@staff = Staff.new
    @store = Store.all
  end

  def create
  	@staff = Staff.new(staff_params)
  	if @staff.save
  	 redirect_to staff_path(@staff.id)
     flash[:staff_created] = "#{@staff.family_name}#{@staff.given_name}を追加しました。"
    else
      redirect_to new_staff_path
      flash[:staff_create_faled] = "作成できませんでした。入力内容を確認してください。"
    end
  end

  def update
    staff = Staff.find(params[:id])
    if staff.update(staff_params)
      redirect_to staff_path
      flash[:staff_updated] = "情報を更新しました。"
    else
      redirect_to staff_path
      flash[:staff_update_faled] = "情報を更新出来ませんでした。"
    end
  end

  def show
  	@staff = Staff.find(params[:id])
    @store = Store.all
  	require 'chunky_png/rmagick' # Magick::Image、ChunkyPNG::Image 間の変換に使用

    text = "http://localhost:3000/staffs/#{@staff.id.to_s}/works/new"
    width = 200
    height = 200

    qr = RQRCode::QRCode.new(text, :size => 10, :level => :h)
    # ChunkyPNG::Image を Magick::Image に変換
    image = ChunkyPNG::RMagick.export(qr.to_img.resize(width, height))

    # Magick::Image を ChunkyPNG::Image に変換して、DetaUrl に
    @qrpng = ChunkyPNG::RMagick.import(image).to_data_url
    @staff.qrcode = @qrpng
    @staff.save
    #ransack
    @search = @staff.works.ransack(params[:q])
    @works = @search.result
    @breaks = 0
    @works.order(:in).each do |workday|# 休憩時間合計ransackからの@works参照
      workday.breaks.each do |break_time|
        unless break_time.break_out.blank?
          off_time = (break_time.break_out.in_time_zone - break_time.break_in.in_time_zone)
          @breaks += off_time
        end
      end
    end
  end

  def destroy
    staff = Staff.find(params[:id])
    staff.destroy
    redirect_to stores_path
  end

  private

  def staff_params
  	params.require(:staff).permit(:id,:qrcode,:family_name,:family_name_kana,:given_name,:given_name_kana,:store_id,:work_id)
  end

  def params_work
    params.require(:work).permit(:in,:out,:staff_id,:break_id)
  end

  def params_break
    params.require(:break).permit(:id,:break_in,:break_out,:work_id)
  end

  def store_params
    params.require(:store).permit(:store_name,:id)
  end
end
